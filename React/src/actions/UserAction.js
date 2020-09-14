import axios from "axios";

import TYPES from "../reducers/types";

export function getAnyUser(id) {
  return function (dispatch) {
    axios.get(`http://localhost:2020/user/${id}`).then((res) => {
      const user = res.data;
      dispatch({
        type: TYPES.GET_ANY_USER,
        payload: user,
      });
    });
  };
}

export async function getAnySpecificUser(id) {
  const res = await axios.get(`http://localhost:2020/user/${id}`);
  return res.data;
}
