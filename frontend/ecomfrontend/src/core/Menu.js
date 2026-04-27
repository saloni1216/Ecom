import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
  if (history.pathname === path) {
    return { color: "#FF4FA3", fontWeight: "bold" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = () => {
  const history = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <ul
        className="nav nav-tabs"
        style={{
          backgroundColor: "#121212",
          borderBottom: "2px solid #FF4FA3",
          padding: "10px",
        }}
      >
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>

        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
              className="nav-link text-warning"
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Menu;
