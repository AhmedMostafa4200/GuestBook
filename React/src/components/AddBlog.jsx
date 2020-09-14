import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signUp, signIn } from "../actions/AuthAction";

import "./AddBlog.css";

const AddBlog = (props) => {
  const handleAddingBlog = () => {
    props.history.push("/blogform/addblog");
  };

  return (
    <React.Fragment>
      {props.auth.isAuthenticated && (
        <i
          className="fas fa-plus-circle add-blog"
          onClick={handleAddingBlog}
        ></i>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default withRouter(
  connect(mapStateToProps, { signUp, signIn })(AddBlog)
);
