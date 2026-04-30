import React, { useState } from "react";
import { Base } from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

export const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log("DATA : ", data);
        if (data.email === email) {
          setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
        } else {
          setValues({ ...values, error: true, success: false });
        }
      })
      .catch((e) => console.log(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
            New account created successfully. Please <Link to="/signin"> Login now</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">

          {/* ✅ Card wrapper - same as Signin */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "25px 25px",
            boxShadow: "0 20px 60px rgba(255, 79, 163, 0.2)",
            border: "1.5px solid #f8bbd0",
            marginTop: "10px",
          }}>

          
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "2.2rem" }}>🛍️</span>
              <h3 style={{ color: "#1a1a1a", fontWeight: "800", margin: "8px 0 4px" }}>Create Account</h3>
              <p style={{ color: "#FF4FA3", fontSize: "0.88rem", margin: 0 }}>Join Pink Store today!</p>
            </div>

            <form>
              <div className="form-group">
                <label style={{ color: "#c2185b", fontWeight: "600", fontSize: "0.85rem" }}>👤 Name</label>
                <input
                  className="form-control"
                  valu={name}
                  onChange={handleChange("name")}
                  type="text"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #f8bbd0",
                    padding: "11px 14px",
                    backgroundColor: "#fff9fc",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ color: "#c2185b", fontWeight: "600", fontSize: "0.85rem" }}>📧 Email</label>
                <input
                  className="form-control"
                  valu={email}
                  onChange={handleChange("email")}
                  type="text"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #f8bbd0",
                    padding: "11px 14px",
                    backgroundColor: "#fff9fc",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ color: "#c2185b", fontWeight: "600", fontSize: "0.85rem" }}>🔒 Password</label>
                <input
                  className="form-control"
                  valu={password}
                  onChange={handleChange("password")}
                  type="password"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #f8bbd0",
                    padding: "11px 14px",
                    backgroundColor: "#fff9fc",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <button
                onClick={onSubmit}
                className="btn btn-success btn-block"
                style={{
                  backgroundColor: "#FF4FA3",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  boxShadow: "0 6px 20px rgba(255, 79, 163, 0.4)",
                  marginTop: "6px",
                }}
              >
                🚀 Submit
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" discription="A signup for LCO user">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* ✅ JSON.stringify line remove kar di */}
    </Base>
  );
};