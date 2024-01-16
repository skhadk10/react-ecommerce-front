import React, { useState } from "react";
import Layout from "../core/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = () => {};

  const signUpForm = () => {
    return (
      <form>
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

  return (
    <div>
   
      <Layout
        title="Signup Page"
        description="Please Sign up here"
        className="container col-md-8 offset-md-2"
      />
      {signUpForm()}
    </div>
  );
};

export default Signup;
