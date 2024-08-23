import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';
import Navbar from '../../components/Navbar';

const EditProfile = () => {
    const [user, setUser] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
        user_role: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
        token = JSON.parse(token);

        const getUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/profile", {
                    headers: {
                        Authorization: "Bearer " + token.token,
                    }
                });
                const { result } = await response.json();
                setUser(result);
            } catch (err) {
                console.log(err);
            }
        };
        getUserProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { user_id, user_email, user_role, user_name } = user

        let token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`http://localhost:8000/api/v1/profile/${user.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token.token,
                },
                body: JSON.stringify({ id: user_id, email: user_email, role: user_role, name: user_name })
            });
            if (response.ok) {
                navigate("/profile");
            } else {
                console.log("Failed to update profile");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className={styles.edit_profile_container}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className={styles.edit_profile_form}>
                    <div className={styles.form_group}>
                        <label htmlFor="user_name">Name:</label>
                        <input
                            type="text"
                            id="user_name"
                            name="user_name"
                            value={user.user_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="user_email">Email:</label>
                        <p>{user?.user_email}</p>
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="user_role">Role:</label>

                        <select
                            id="role"
                            onChange={handleChange}
                            className={styles.select}
                            name="user_role"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.save_button}>Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;