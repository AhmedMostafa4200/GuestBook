import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import BlogItem from "./BlogItem";

import { getAllBlogs } from "../actions/BlogAction";

const Explore = (props) => {
  const [state, setState] = useState({
    start: 0,
    size: 3,
  });
  let { start, size } = state;

  useEffect(() => {
    props.getAllBlogs(start, size);
  }, []);

  const handlePagination = () => {
    setState({ ...state, size: size + 2 });
    props.getAllBlogs(start, size + 2);
  };

  return (
    <React.Fragment>
      <BlogItem blogs={props.allBlogs}></BlogItem>
      <div style={{ textAlign: "center" }}>
        {props.allBlogs.length === size && (
          <button
            type="button"
            onClick={handlePagination}
            className="btn btn-success text-success bg-dark mt-1 mb-1 p-2 pl-3 pr-3"
          >
            Load more blogs
          </button>
        )}
        {props.allBlogs.length !== size && (
          <h5 className="btn btn-success text-success bg-dark mt-5 mb-1 p-2 pl-3 pr-3">
            No more blogs to preview!
          </h5>
        )}
      </div>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    allBlogs: state.blogs.items,
  };
}
export default connect(mapStateToProps, { getAllBlogs })(Explore);
