import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { signout, isAuthenticated } from "../auth/helper/index";
// Import Icons
import {
  ShoppingBag,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react";

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

  // Helper to style icons to match text color
  const iconStyle = { marginRight: "8px", verticalAlign: "middle" };

  return (
    <div>
      <ul
         className="nav nav-tabs custom-navbar"
        style={{
          backgroundColor: "#121212",
          borderBottom: "2px solid #FF4FA3",
          padding: "10px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          listStyle: "none",
          margin: 0,
        }}
      >
        {/* Left: Brand with Bag Icon */}
        <div
        className="nav-links"
          style={{
            flex: 1,
            fontSize: "20px",
            fontWeight: "bold",
            color: "#FF4FA3",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ShoppingBag size={22} style={{ marginRight: "10px" }} />
          Pink{" "}
          <span style={{ color: "#FFFFFF", marginLeft: "5px" }}>Store</span>
        </div>

      
        <div
        className="nav-links"
          style={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            gap: "15px",
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
              <ShoppingCart size={15} style={iconStyle} />
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
                <LayoutDashboard size={15} style={iconStyle} />
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
                  <LogIn size={15} style={iconStyle} />
                  Signin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  <UserPlus size={15} style={iconStyle} />
                  Signup
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <span
                onClick={() => signout(() => navigate("/"))}
                className="nav-link text-warning"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LogOut size={15} style={iconStyle} />
                Signout
              </span>
            </li>
          )}
        </div>

        {/* Right: Empty space */}
        <div style={{ flex: 1 }}></div>
      </ul>
    </div>
  );
};

export default Menu;
