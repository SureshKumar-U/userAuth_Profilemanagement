import React from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const clickHandler = ()=>{
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <nav>
        <Link to={"/"} className="logo">Userprofile management</Link>
        <ul>
            <li><button onClick={clickHandler}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar