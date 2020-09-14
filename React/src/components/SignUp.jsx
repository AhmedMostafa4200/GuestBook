import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../actions/AuthAction.js";

import { toast } from "react-toastify";

const SignUp = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      window.location.assign("/signin");
    }
  }, [props.auth.isAuthenticated]);

  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const { email, name, password, confirmPassword, image } = state;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setState({ ...state, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      props.signUp({ email, name, password, image });
    } else if (password !== confirmPassword) {
      toast("Password not match");
    }
    if (image == "") {
      toast("Please upload profile image!");
    }
  };

  return (
    <React.Fragment>
      <section>
        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-90">
            <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
              <div
                className="card shadow zindex-100 mb-0"
                style={{ backgroundColor: "#011528" }}
              >
                <div className="card-body px-md-5 py-5">
                  <div className="mb-3">
                    <h6 className="h3 text-white">Sign up</h6>
                    <p className="text-muted mb-0">
                      Create new account to continue.
                    </p>
                  </div>
                  <span className="clearfix" />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        className="form-control-label text-muted"
                        htmlFor="input-name"
                      >
                        Full Name
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="input-name"
                          required
                          maxLength="25"
                          placeholder="Ahmed Mostafa"
                          name="name"
                          value={name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                          className="form-control"
                          required
                          id="input-email"
                          placeholder="ahmed@gmail.com"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
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
                          className="form-control"
                          minLength="8"
                          required
                          id="input-password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <label
                            className="form-control-label text-muted"
                            htmlFor="input-password2"
                          >
                            Confirm Password
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
                          className="form-control"
                          id="input-password2"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group pb-2">
                        <br />
                        <label className="btn btn-outline-info">
                          Upload Profile Image
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            hidden
                            id="signup-user-image"
                            onChange={handleImageChange}
                          />
                        </label>
                        &nbsp;&nbsp;
                        <small className="text-muted">Max size: 5mb</small>
                        <br />
                        {image?.name && (
                          <small className="text-success">{image.name}</small>
                        )}
                        <img src="" alt="" id="myimage" className="" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer px-md-5">
                  <small className="text-muted">
                    Already have an account?{" "}
                  </small>
                  <Link
                    to="/signin"
                    className="small font-weight-bold text-white"
                  >
                    Sign In
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

export default withRouter(connect(mapStateToProps, { signUp })(SignUp));
