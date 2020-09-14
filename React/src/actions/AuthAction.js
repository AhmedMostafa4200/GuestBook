import axios from "axios";

import { toast } from "react-toastify";

import TYPES from "../reducers/types";

export const signUp = ({ name, email, password, image }) => async (
  dispatch
) => {
  let formData = new FormData();
  formData.set("user", JSON.stringify({ name, email, password }));
  formData.append("image", image);
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:2020/signup",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    localStorage.setItem("token", data.token);

    dispatch({
      type: TYPES.SIGN_UP,
      payload: data,
    });
  } catch (e) {
    toast("Invalid data! Please fill out all fields with correct data");
    console.log(e);
    return e;
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const { data } = await axios.post("http://localhost:2020/signin", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("token", data.token);

    dispatch({
      type: TYPES.SIGN_IN,
      payload: data,
    });
  } catch (e) {
    toast("Invalid e-mail or password!");
    console.log(e);
    return e;
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:2020/logoutAll",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"), ///////
        },
      }
    );

    dispatch({
      type: TYPES.LOG_OUT,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
