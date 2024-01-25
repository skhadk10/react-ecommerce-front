import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../Config";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;
  console.log(error, "checking error message");
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signup = (user) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const signUpForm = () => {
    return (
      <form className="container">
        <div className="form-group">
          <label className="text-muted">name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => (
    <div className="container">
      {error &&
        error?.map((errorMsg, index) => (
          <div key={index} className="alert alert-danger" role="alert">
            {errorMsg.msg}
          </div>
        ))}
    </div>
  );
  
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account is created. Please Signin
    </div>
  );
  return (
    <div>
      <Layout
        title="Signup Page"
        description="Please Sign up here"
        className="container col-md-8 offset-md-2"
      />
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
