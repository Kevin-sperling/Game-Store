import React from 'react'
// import Logo from "../Assets/logo.jpg"
// import "./Navbar.css"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='flex justify-between w-full'>
                <div className='brand'>
                    <h2>Test Game</h2>
                </div>
                <div className='flex links'>
                    <div className='flex-auto w-20'>
                        <span>Login</span>
                    </div>
                    <div className='flex-auto w-20'>
                        <span>Register</span>
                    </div>
                    <div className='flex-autow-20'>
                        <span>Games</span>
                    </div>
                </div>
                <div className='search'>
                    <div>
                        <input placeholder='search games' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
