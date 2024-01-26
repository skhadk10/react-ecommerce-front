import React, { useState } from "react";
import {Link} from "react-router-dom"
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    errorMsg:"",
    success: false,
  });

  const { name, email, password, success, error ,errorMsg} = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false,errorMsg:false, [name]: e.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password }).then((data) => {
      
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else if(data.errMsg) {
        setValues({ ...values, errorMsg: data.errMsg, success: false });
      }
      else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          errorMsg:"",
          success: true,
        });
      }
    });
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
        error.map((errors,i) => (
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
  
  const showSuccess = () => (
    <div
      className="alert alert-info container"
      style={{ display: success ? "" : "none" }}
    >
      New Account is created. Please <Link to="/signin">Signin</Link>
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
    </div>
  );
};

export default Signup;
