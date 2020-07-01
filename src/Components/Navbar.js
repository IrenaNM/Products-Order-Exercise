import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="NavLinks">
        <ul className="NavDiv">
          <li>
            <NavLink exact activeClassName="active-menu" to="/">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-menu" to="/order">
              Order
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
