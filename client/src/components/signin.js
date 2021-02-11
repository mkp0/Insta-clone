import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const Signin = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const postData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-2" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          console.log(data);
          M.toast({
            html: "Sign in successfully!!",
            classes: "green darken-2",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-font">Instagram</h2>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button
          className="btn waves-effect waves-light  pink darken-1"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Login
        </button>
        <h5>
          <u>
            <Link to="/signup">Don'thave an account</Link>
          </u>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
