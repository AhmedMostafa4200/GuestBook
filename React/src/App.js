import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import NavBar from "./components/NavBar";
import Explore from "./components/Explore";
import AddBlog from "./components/AddBlog";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  // window.onload = window.localStorage.clear();

  return (
    <React.Fragment>
      <Provider store={store}>
        <div className="body-bg">
          <NavBar></NavBar>
          <main>
            <Switch>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>
              <Route path="/signin">
                <SignIn></SignIn>
              </Route>

              <ProtectedRoute path="/explore" component={Explore} />

              <ProtectedRoute path="/blogform/:blogId" component={BlogForm} />

              {/* <Route path="/blogform/:blogId">
                <BlogForm></BlogForm>
              </Route> */}
            </Switch>
          </main>
          <ProtectedRoute path="/addblog" component={AddBlog} />

          {/* <AddBlog></AddBlog> */}
          <Footer></Footer>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
