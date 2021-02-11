import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const func = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/signin");
  };

  return <div>{func()}</div>;
};

export default Logout;
