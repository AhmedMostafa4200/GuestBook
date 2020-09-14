import TYPES from "./types";

// Blogs initial state
const initialState = {
  items: [], // all users
  item: {}, // any user
};

export default function (prevState = initialState, action) {
  switch (action.type) {
    case TYPES.GET_ANY_USER:
      return {
        ...prevState,
        item: action.payload,
      };

    default:
      return prevState;
  }
}
