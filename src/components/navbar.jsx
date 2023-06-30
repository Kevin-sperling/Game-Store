import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from "../Assets/logo.jpg"
// import "./Navbar.css"

const Navbar = ({ user }) => {
    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    {/* <img src={Logo} alt="" /> */}
                </div>
                <Link className="Links" to="/">
                    <h6>Games</h6>
                </Link>
                {
                    user && (
                        <>
                            <Link className="Links" to="/login">
                                <h6>Login</h6>
                            </Link>
                            <Link className="Links" to="/register">
                                <h6>Register</h6>
                            </Link>

                        </>
                    )
                }
                <Link className="Links" to="/create">
                    <h6>Cart</h6>
                </Link>
                {/* <Link className="Links" to="/?cat=SinglePost">
                    <h6>Single Post</h6>
                    </Link> */}
                <span>Logout</span>

            </div>
        </div>


    )
}

export default Navbar