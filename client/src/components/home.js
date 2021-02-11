import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    fetch("/allpost", {
      headers: {
        method: "GET",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.allposts);
      });
  }, []);

  const likepost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const newData = data.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikepost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const newData = data.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, id) => {
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
        text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const newData = data.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="post1" />
            </div>
            <div className="card-content">
              <i
                className="material-icons"
                style={
                  item.likes.includes(state._id)
                    ? { color: "red" }
                    : { color: "gray" }
                }
                onClick={() => {
                  console.log(state._id);
                  if (item.likes.includes(state._id)) {
                    unlikepost(item._id);
                  } else {
                    likepost(item._id);
                  }
                }}
              >
                favorite
              </i>

              <h6>{item.likes.length} likes</h6>
              <h6>
                <span style={{ fontWeight: 600, color: "red" }}>Title : </span>
                {item.title}
              </h6>
              <p>
                <span style={{ fontWeight: 600, color: "red" }}>Body : </span>
                {item.body}
              </p>
              {item.comments.map((val) => {
                return (
                  <h6 key={val._id}>
                    <span style={{ fontWeight: 600, color: "red" }}>
                      {val.postBy.name ? val.postBy.name : "loading"} :{" "}
                    </span>{" "}
                    {val.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input type="text" placeholder="add a comments" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
