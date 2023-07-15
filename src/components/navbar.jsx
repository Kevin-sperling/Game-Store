import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./cart";

// import Logo from "../Assets/logo.jpg"

const Navbar = () => {
  const token = window.localStorage.getItem("token");
  const Navigate = useNavigate();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <div className="btn btn-ghost normal-case hover:text-white active:text-violet-600 text-4xl">
            GameStahhhp
          </div>
        </Link>
      </div>

      {token ? (
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-square hover:text-white active:text-violet-600"
          >
            <div className="indicator">
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
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          ></div>
        </div>
      ) : null}
      {/* ) : null} */}

      {token ? (
        <div className="dropdown dropdown-end">
          <div className="dropdown">
            <a
              className="btn btn-ghost normal-case hover:text-white active:text-violet-600 text-base"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                Navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <li>
          <a
            href="/login"
            className="btn btn-ghost normal-case hover:text-white active:text-violet-600 text-base"
          >
            Login
          </a>
        </li>
      )}
    </div>
  );
};

export default Navbar;
