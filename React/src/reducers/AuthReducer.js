import TYPES from "./types";

const initialState = {
  item: {}, // author
  isAuthenticated: false,
  token: "",
};

export default function (prevState = initialState, action) {
  switch (action.type) {
    case TYPES.SIGN_UP:
      localStorage.setItem("token", action.payload.token);
      return {
        ...prevState,
        item: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case TYPES.SIGN_IN:
      return {
        ...prevState,
        item: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case TYPES.LOG_OUT:
      return {
        ...prevState,
        item: action.payload,
        isAuthenticated: false,
        token: "",
      };

    default:
      return prevState;
  }
}
