import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { getAnySpecificUser } from "../actions/UserAction";

import { getImageUrl } from "../utils/utils";

const BlogOwner = (props) => {
  const id = props.id;
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async function () {
      const x = await getAnySpecificUser(id);
      setUser(x);
    })();
  }, []);

  if (user) {
    return (
      <React.Fragment>
        <div className="profile-container">
          <img
            className="profile-name-img"
            style={{ borderRadius: "15%" }}
            src="https://images.forbes.com/media/assets/thoughts/images/silhouette.jpg"
            // src={
            //   user.image
            //     ? getImageUrl(user.image.data)
            //     : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
            // }
            alt=""
          ></img>
          <div className="profile-name-container">
            <small className="text-success">
              &nbsp;&nbsp;
              {user.name}
            </small>
            <small className="text-muted">
              &nbsp;&nbsp;
              {moment(props.time).format("MMMM Do YYYY, h:mm:ss a")}
            </small>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <h1>loading</h1>;
};

export default BlogOwner;
