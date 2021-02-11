import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.mypost);
      });
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "300px", height: "300px", borderRadius: "80px" }}
            src="https://images.pexels.com/photos/4393464/pexels-photo-4393464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="profile-pic"
          />
        </div>
        <div>
          <h4>Name : {state ? state.name : "loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h6>20 Posts</h6>
            <h6>311 followers</h6>
            <h6>400 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {data.map((val) => (
          <img
            className="gallery-img"
            src={val.photo}
            key={val._id}
            alt="img1"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
