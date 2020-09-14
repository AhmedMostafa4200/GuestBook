import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../actions/AuthAction.js";

const SignIn = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.replace("/explore");
    }
  }, [props.auth.isAuthenticated]);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({ email, password });
  };

  return (
    <React.Fragment>
      <section>
        <div className="container d-flex flex-column mt-3">
          <div className="row align-items-center justify-content-center min-vh-90">
            <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
              <div
                className="card shadow zindex-100 mb-0"
                style={{ backgroundColor: "#011528" }}
              >
                <div className="card-body px-md-5 py-5">
                  <div className="mb-5">
                    <h6 className="h3 text-white">Login</h6>
                    <p className="text-muted mb-0">
                      Sign in to your account to continue.
                    </p>
                  </div>
                  <span className="clearfix" />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        className="form-control-label text-muted"
                        htmlFor="input-email"
                      >
                        Email address
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          required
                          className="form-control"
                          id="input-email"
                          placeholder="name@example.com"
                          name="email"
                          value={state.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <label
                            className="form-control-label text-muted"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-key" aria-hidden="true"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          required
                          className="form-control"
                          id="input-password"
                          placeholder="Password"
                          name="password"
                          value={state.password}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer px-md-5">
                  <small className="text-muted">Don't have an account? </small>
                  <Link
                    to="/signup"
                    className="small font-weight-bold text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps, { signIn })(SignIn));
