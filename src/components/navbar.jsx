import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <div className="logo-container">
            <span className="game">GameSpace</span>
            {/* <span className="stahhhp">Stahhhp</span> */}
          </div>
        </Link>
      </div>

      {token ? (
        <div className="">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-square hover:text-white active:text-red-600"
          >
            <div>
              <Link to="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </div>
          </label>
        </div>
      ) : null}
      {/* ) : null} */}

      {token ? (
        <div>
          <a
            className="btn btn-ghost normal-case hover:text-white active:text-red-600 text-base"
            onClick={() => {
              localStorage.clear();
              Navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </a>
        </div>
      ) : (
        <div>
          <div>
            <a
              href="/login"
              className="btn btn-ghost normal-case hover:text-white active:text-red-600 text-base"
            >
              Login
            </a>
          </div>
          <div>
            <a
              href="/register"
              className="btn btn-ghost normal-case hover:text-white active:text-red-600 text-base"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

