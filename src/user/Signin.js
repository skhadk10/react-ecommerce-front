import React, { useState } from "react";
import { Link, Redirect, useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import { authenticate, signin, isAuthenticated } from "../auth/index";

const Signin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "rickeykhd@gmail.com",
    password: "123456",
    error: "",
    errorMsg: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, error, errorMsg, loading, redirectToReferer } =
    values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      errorMsg: false,
      [name]: e.target.value,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, errorMsg: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else if (data.errorMsg) {
        setValues({ ...values, errorMsg: data.errorMsg, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <form className="container">
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
        error.map((errors, i) => (
          <div key={i} className="alert alert-danger" role="alert">
            {errors.msg}
          </div>
        ))}

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info container">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = (req, res) => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      } else {
        return navigate("/user/dashboard");
      }
    }
    if (isAuthenticated()) {
      return navigate("/");
    }
  };

  return (
    <div>
      <Layout
        title="Signin Page"
        description="Please Sign in here"
        className="container col-md-8 offset-md-2"
      />
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
