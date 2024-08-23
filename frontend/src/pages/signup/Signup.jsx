import React, { useEffect, useState } from 'react';
import styles from "./Signup.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';


const Signup = () => {

  const navigate = useNavigate()
  const [User, setUser] = useState({ name: "", email: "", password: "", role: "" });
  const [validationErr, setValidationErr] = useState({})
  const [Notify, setNotify] = useState({ active: false, type: "", message: "" })

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      navigate("/profile")
    }
  }, [])


  const handleClose = () => {
    setNotify({ active: false, type: "", message: "" })
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidationErr({ ...validationErr, [name]: "" })
    setUser({ ...User, [name]: value });
  };


  const validator = () => {
    const error = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (User.name.trim() == "") {
      error.name = "Username  is required"
    }
    if (User.email.trim() == "") {
      error.email = "Email is required"
    }
    else if (!emailRegex.test(User.email)) {
      error.email = "Invalid email"
    }
    if (User.password.trim() == "") {
      error.password = "Password is required"
    }
    else if (User.password.trim().length < 6) {
      error.password = "Password should not be lessthan 6 characters"
    }
    setValidationErr(error)
    return error
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validator()
    if (Object.keys(err).length != 0) {
      return
    }
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });

      const { status, message } = await response.json()
      if (status != 200) {
        setNotify({ active: true, type: "error", message: message })
      }
      else {
        setNotify({ active: true, type: "success", message: message })
        setUser({ name: "", email: "", password: "", role: "" })
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {Notify.active && <Alert type={Notify.type} message={Notify.message} onClose={handleClose} />}
      <div className={styles.container}>
        <h3>Register your account</h3>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="name"
              value={User.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {validationErr?.name && <span>{validationErr.name}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={User.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {validationErr?.email && <span>{validationErr.email}</span>}

          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={User.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {validationErr?.password && <span>{validationErr.password}+
            </span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              onChange={handleChange}
              className={styles.select}
              name="role"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="button" className={styles.button} onClick={handleSubmit}>
            Signup
          </button>
        </form>
        <h5>Already you have an account <Link to="/">Login</Link></h5>
      </div>

    </>

  );
};

export default Signup;
