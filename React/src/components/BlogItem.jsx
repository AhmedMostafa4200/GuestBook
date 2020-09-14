import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import BlogOwner from "./BlogOwner";

import { deleteASpecificBlog } from "../actions/BlogAction";

import "./BlogItem.css";

const BlogItem = (props) => {
  let blogs = props.blogs;

  const handleDeletingBlog = (blogId) => {
    props.deleteASpecificBlog(blogId);
    delete blogs[props.blogs.findIndex((blog) => blog?._id == blogId)];
  };

  if (blogs) {
    return (
      <React.Fragment>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="blog-card card text-white mt-4"
                style={{ backgroundColor: "#18191A" }}
              >
                <BlogOwner id={blog.owner} time={blog.date}></BlogOwner>

                <h5 className="card-text">{blog.body}</h5>
                {props.auth.item._id === blog.owner && (
                  <div className="card-button">
                    <Link
                      // to={`/blogform/addblog/edit/${blog._id}`}
                      // state={blog.body}
                      to={{
                        pathname: `/blogform/addblog/edit/${blog._id}`,
                        state: { body: blog.body },
                      }}
                      className="btn btn-outline-info"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => handleDeletingBlog(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </React.Fragment>
    );
  }
  return <h1>loading</h1>;
};

function mapStateToProps(state) {
  return {
    anyUser: state.anyUser.item,
    auth: state.auth,
    blogToEditOrDelete: state.blogs.item,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    deleteASpecificBlog,
  })(BlogItem)
);
