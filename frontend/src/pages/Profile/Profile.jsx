// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
    token = JSON.parse(token)
    const getuserProfile = async () => {

      try {
        const response = await fetch("http://localhost:8000/api/v1/profile", {
          headers: {
            Authorization: "Bearer " + token.token,
          }
        })
        const { result } = await response.json()
        setUser(result)
      }
      catch (err) {
        console.log(err)
      }
    }
    getuserProfile()
  }, [])


  return (
    <div>
      <Navbar />
      <div className={styles.profile_container}>
        <h2>Profile</h2>
        <div className={styles.profile_info}>
          <div className="user_details">
            <h2>{user?.user_name}</h2>
            <p>Email: {user?.user_email}</p>
            <p>Role: {user?.user_role}</p>
          </div>
        </div>

        <Link to={`/profile/${user?.user_id}`} className={styles.edit_profile}>Edit Profile</Link>
      </div>
    </div>

  )
};

export default Profile;
