import React, { useEffect, useState } from 'react';
import styles from "./Login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

const Login = () => {

  const navigate = useNavigate()
  const [User, setUser] = useState({ email: "", password: "" });
  const [validationErr, setValidationErr] = useState({})
  const [Notify, setNotify] = useState({ active: false, type: "", message: "" })

  useEffect(() => {
    const token = localStorage.getItem("jwt")
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
    console.lo
    const err = validator()
    if (Object.keys(err).length != 0) {
      return
    }
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });
      const { status, message, token } = await response.json()
      if (status != 200) {
        setNotify({ active: true, type: "error", message: message })

      }
      else {
        setNotify({ active: true, type: "success", message: message })
        localStorage.setItem("token", JSON.stringify({ token: token }))
        setTimeout(() => {
          navigate("/profile")
        }, 2000)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Notify.active && <Alert type={Notify.type} message={Notify.message} onClose={handleClose} />}
      <div className={styles.container}>
        <h3>Login into your account</h3>
        <form>
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
          <button type="button" className={styles.button} onClick={handleSubmit}>
            Signup
          </button>
        </form>
        <h5>Don't have an account? <Link to="/signup">Signup</Link></h5>
      </div>

    </>

  );
};

export default Login;
