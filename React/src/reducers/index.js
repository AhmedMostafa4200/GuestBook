// Root reducer

import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import BlogReducer from "./BlogReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  blogs: BlogReducer,
  anyUser: UserReducer,
});
