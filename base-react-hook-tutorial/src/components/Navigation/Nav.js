/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("account");
    if (session) {
      setIsShow(true); // Hiển thị nav nếu có tài khoản
    } else if (location.pathname === "/login") {
      setIsShow(false); // Ẩn nav nếu ở trang login
    }
  }, [location]);

  return (
    <>
      {isShow && (
        <div className=" nav">
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" activeClassName="active">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" activeClassName="active">
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
