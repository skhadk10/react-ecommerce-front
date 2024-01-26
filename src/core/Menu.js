import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (currentPath, path) => {
  if (currentPath === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};
const Menu = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  console.log(currentPath);

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(currentPath, "/")} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <div>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(currentPath, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(currentPath, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </div>
        )}
        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    navigate("/");
                  })
                }
              >
                Signout
              </span>{" "}
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(currentPath, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default Menu;
