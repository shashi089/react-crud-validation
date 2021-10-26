import { NavLink } from "react-router-dom";

import "./components.css";

function Header() {
  return (
    <>
      <div className="text-center d-flex flex-wrap justify-content-center mt-2 container">
        <h1 className="brand text-center">
          React-CRUD
          <br />
        </h1>

        <NavLink
          exact
          to="/"
          className="navlink brand mr-4 ml-auto"
          activeClassName="activenavlink"
        >
          <h4>Home</h4>
        </NavLink>

        <NavLink
          to="/createuser"
          className="navlink"
          activeClassName="activenavlink"
        >
          <h4>Add Profile</h4>
        </NavLink>
      </div>
    </>
  );
}

export default Header;
