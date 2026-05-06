import React, { useState } from "react";
import { Base } from "../core/Base";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

export const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "saloni@gmail.com",
    password: "1234",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { name, email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        console.log("Data ", data);
        if (data.token) {
          authenticate(data, () => {
            console.log("TOKEN ADDED");
            setValues({ ...values, didRedirect: true });
          });
        } else {
          setValues({ ...values, loading: false });
        }
      })
      .catch((e) => console.log(e));
  };

  const performNavigate = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const lodingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">

          {/* ✅ Card wrapper */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "30px 30px",
            boxShadow: "0 20px 60px rgba(255, 79, 163, 0.2)",
            border: "1.5px solid #f8bbd0",
            marginTop: "10px",
          }}>

            {/* ✅ Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "2.2rem" }}>🔐</span>
              <h3 style={{ color: "#1a1a1a", fontWeight: "800", margin: "8px 0 4px" }}>Welcome Back</h3>
              <p style={{ color: "#FF4FA3", fontSize: "0.88rem", margin: 0 }}>Sign in to your Pink Store account</p>
            </div>

            <form>
              <div className="form-group">
                <label style={{ color: "#c2185b", fontWeight: "600", fontSize: "0.85rem" }}>📧 Email</label>
                <input
                  className="form-control"
                  value={email}
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
                  value={password}
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
    <Base title="welcome to signin page">
      {lodingMessage()}
      {signInForm()}
      {/* <p className="text-center">{JSON.stringify(values)}</p> */}
      {performNavigate()}
    </Base>
  );
};