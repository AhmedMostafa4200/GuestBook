import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../actions/AuthAction";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const isAuthenticated = props.auth?.isAuthenticated;

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/signin" }} />
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default withRouter(connect(mapStateToProps, { signIn })(ProtectedRoute));
// export default ProtectedRoute;
