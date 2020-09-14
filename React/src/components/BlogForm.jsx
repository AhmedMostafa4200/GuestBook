import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { postNewBlog, editBlog } from "../actions/BlogAction";

import "./BlogForm.css";

const BlogForm = (props) => {
  const isEditable = window.location.pathname.includes("edit");
  const editableBlogId = window.location.pathname.split("/")[4];
  const [owner, setOwner] = useState({});

  useEffect(() => {
    setOwner(props.auth.item._id);
  }, [props.auth.item._id]);

  const [state, setState] = useState(
    {
      body: props.location.state?.body ? props.location.state?.body : "",
    },
    []
  );
  let { body } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) {
      props.postNewBlog({ body, owner });
    } else {
      props.editBlog({ body, editableBlogId });
    }
    props.history.push("/explore");
  };
  const handleCanceling = () => {
    props.history.push("/explore");
  };
  console.log(props.location.state?.body);
  return (
    <React.Fragment>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-row"></div>
        <div className="form-group">
          <label htmlFor="inputBody" className="m-2">
            Comment
          </label>
          <textarea
            style={{ minHeight: 300 }}
            rows="8"
            required
            maxLength="300"
            className="blog-input form-control"
            id="inputBody"
            placeholder="Max length 300 characters"
            name="body"
            value={body}
            onChange={handleChange}
          />
        </div>
        <div className="form-btns">
          <button type="submit" className="btn btn-primary mr-1">
            {!isEditable && "Post"}
            {isEditable && "Save"}
          </button>
          <button className="btn btn-primary" onClick={handleCanceling}>
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    blogToPostOrEdit: state.blogs.item,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    postNewBlog,
    editBlog,
  })(BlogForm)
);
