import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
const NavBar = () => {
  const { state } = useContext(UserContext);

  const renderList = () => {
    if (state) {
      return [
        <li key={1}>
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li key={2}>
          <Link to="/profile">Profile</Link>
        </li>,
        <li key={3}>
          <Link to="/logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        <li key={1}>
          <Link to="/signin">Sign In</Link>
        </li>,
        <li key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };

  return (
    <nav className="main-navbar">
      <div className="nav-wrapper pink lighten-2 ">
        <Link
          to={state ? "/" : "/signin"}
          className="brand-logo left brand-font"
        >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
