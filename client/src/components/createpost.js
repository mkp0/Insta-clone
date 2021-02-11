import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = new useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-2" });
            return;
          } else {
            M.toast({
              html: "Uploaded in successfully!!",
              classes: "green darken-2",
            });
            console.log(url);
            history.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    //data store in cloud
    const fd = new FormData();
    fd.append("file", image);
    fd.append("upload_preset", "insta-clone");
    fd.append("cloud_name", "dofdxvewv");
    fetch("https://api.cloudinary.com/v1_1/dofdxvewv/image/upload", {
      method: "post",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card input-filled"
      style={{
        margin: "30px auto",
        maxWidth: "600px",
        padding: "20px 10px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <div className="file-field input-field">
        <div className="btn pink darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light  pink darken-1"
        type="submit"
        name="action"
        onClick={() => {
          postDetails();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
