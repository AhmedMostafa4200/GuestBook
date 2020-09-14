import axios from "axios";

import { toast } from "react-toastify";

import TYPES from "../reducers/types";

export function getAllBlogs(start, size) {
  return function (dispatch) {
    axios
      .get(`http://localhost:2020/tasks?start=${start}&size=${size}`)
      .then((res) => {
        const blogs = res.data;
        dispatch({
          type: TYPES.GET_BLOGS,
          payload: blogs,
        });
      });
  };
}
export function gethHomeBlogs() {
  const token = localStorage.getItem("token");
  return function (dispatch) {
    axios
      .get(`http://localhost:2020/home`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const blogs = res.data;
        dispatch({
          type: TYPES.GET_BLOGS,
          payload: blogs,
        });
      });
  };
}

export const postNewBlog = ({ body, owner }) => async (dispatch) => {
  let formData = new FormData();
  formData.set("blog", JSON.stringify({ body, owner }));

  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:2020/tasks/newtask",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"), ///////
      },
    });
    dispatch({
      type: TYPES.POST_NEW_BLOG,
      payload: data,
    });
  } catch (e) {
    toast("Please fill out all fields with correct data!");
    console.log(e);
    return e;
  }
};

export function deleteASpecificBlog(blogId) {
  const token = localStorage.getItem("token");
  return function (dispatch) {
    axios
      .delete(`http://localhost:2020/deleteTask/${blogId}`, {
        "Content-Type": "aplication/json",
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const blog = res.data;
        dispatch({
          type: TYPES.DELETE_BLOG,
          payload: blog,
        });
      });
  };
}

export const editBlog = ({ body, editableBlogId }) => async (dispatch) => {
  let formData = new FormData();
  formData.set("blog", JSON.stringify({ body, editableBlogId }));
  // formData.append("image", image);

  try {
    const { data } = await axios({
      method: "patch",
      url: `http://localhost:2020/tasks/blogtoedit`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"), ///////
      },
    });
    dispatch({
      type: TYPES.POST_NEW_BLOG,
      payload: data,
    });
  } catch (e) {
    toast("Please fill out all fields with correct data!");
    console.log(e);
    return e;
  }
};
