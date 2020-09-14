import TYPES from "./types";

const initialState = {
  items: [], // blogs
  item: {}, // one blog
};

export default function (prevState = initialState, action) {
  switch (action.type) {
    case TYPES.GET_BLOGS:
      return {
        ...prevState,
        items: action.payload,
      };

    case TYPES.GET_BLOG_TO_EDIT:
      return {
        ...prevState,
        item: action.payload,
      };

    case TYPES.POST_NEW_BLOG:
      return {
        ...prevState,
        item: action.payload,
      };

    case TYPES.DELETE_BLOG:
      return {
        ...prevState,
        item: action.payload,
      };

    default:
      return prevState;
  }
}
