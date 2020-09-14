import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import setAuthorizationToken from "../src/utils/utils";
import rootReducer from "./reducers/index";

const initialState = {};
const middlewares = [thunk];

export default createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// setAuthorizationToken(localStorage.getItem("token"));
