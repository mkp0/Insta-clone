import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validPassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(password));
  }

  const postData = () => {
    if (!validateEmail(email)) {
      return M.toast({ html: "Enter valid email", classes: "red darken-2" });
    }
    if (!validPassword(password)) {
      return M.toast({
        html: "Must contain 6 to 16 character with 1 no 1 spacial char",
        classes: "red darken-2",
      });
    }

    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-2" });
        } else {
          M.toast({ html: data.message, classes: "green darken-2" });
          history.push("/signin");
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
          placeholder="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button
          className="btn waves-effect waves-light  pink darken-1"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Singup
        </button>
        <h5>
          <u>
            <Link to="/signin">Already have an account</Link>
          </u>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
