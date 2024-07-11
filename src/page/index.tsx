// Index.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../style/index.scss";
import { nameUser } from "../user/user";
import banner from "../img/banner.jpg";
const Index: React.FC = () => {
  return (
    <>
      <img style={{ height: "7rem" }} src={banner} alt="Ảnh banner" />
      <ul className="menu-sub" id="sub3">
        <li>
          <NavLink to="/" end>
            <p>
              <i className="far fa-circle"></i>
              <span className="hidenText"> Home </span>
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs">
            <p>
              <i className="far fa-circle"></i>
              <span className="hidenText"> Blogs</span>
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs/create">
            <p>
              <i className="far fa-circle"></i>
              <span className="hidenText"> create Blog</span>
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs/myBlog">
            <p>
              <i className="far fa-circle"></i>
              <span className="hidenText">my Blog</span>
            </p>
          </NavLink>
        </li>

        {nameUser === "Phạm Duy" && (
          <li>
            <NavLink to="/blogs/blogApproval">
              <p>
                <i className="far fa-circle"></i>
                <span className="hidenText">blogApproval</span>
              </p>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/blogs/myBlog">
            <p>
              <i className="far fa-circle"></i>
              <span className="hidenText">Xin chào : {nameUser}</span>
            </p>
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Index;
