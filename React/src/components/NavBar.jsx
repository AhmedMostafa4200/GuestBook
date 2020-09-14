import React from "react";
import { withRouter, NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../actions/AuthAction";

const NavBar = (props) => {
  const handleLoggingOut = () => {
    props.logOut();
    localStorage.clear();
    window.location.replace("/explore");
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top"
        style={{ backgroundColor: "#252525" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/explore">
                <i className="fas fa-house-damage"></i>&nbsp;
                GuestBook&nbsp;&nbsp;&nbsp;
              </NavLink>
            </li>
          </ul>

          {!props.auth.isAuthenticated && (
            <Link
              to="/signup"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Sign up
            </Link>
          )}
          {!props.auth.isAuthenticated && (
            <Link
              to="/signin"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Sign in
            </Link>
          )}
          {props.auth.isAuthenticated && (
            <button
              onClick={handleLoggingOut}
              className="btn btn-outline-danger text-danger my-2 my-sm-0"
              type="submit"
            >
              Log out
            </button>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default withRouter(connect(mapStateToProps, { logOut })(NavBar));
