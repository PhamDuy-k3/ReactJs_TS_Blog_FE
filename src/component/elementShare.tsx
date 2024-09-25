import React, { useState, useEffect } from "react";
import { Blog } from "../interface/blog";
import { IBlogShare } from "../interface/BlogShare";
import { NavLink } from "react-router-dom";

interface ElementBlogProps {
  sharedPosts: IBlogShare[];
}

export const ElementShare: React.FC<ElementBlogProps> = ({ sharedPosts }) => {
  return (
    <>
      <div className="blogs">
        <ul>
          {sharedPosts.length > 0 ? (
            sharedPosts.map((share) => (
              <li key={share._id}>
                <NavLink className="nav-link" to={`/blogs/${share.postId._id}`}>
                  <h4 style={{ fontWeight: "bold" }}>
                    {share.nameUser} đã chia sẻ
                  </h4>
                  <p>Time : {new Date(share.sharedAt).toLocaleDateString()}</p>

                  <p>{share.message}</p>

                  <img src={share.postId.image} alt={share.postId.title} />
                  <h5
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {share.postId.title}
                  </h5>
                  <p style={{ fontWeight: "bold" }}>{share.postId.author}</p>
                  <p>
                    <strong>Lượt xem:</strong> {share.postId.views}
                  </p>
                  <p>{share.postId.content.substring(0, 80)}...</p>
                  <p style={{ marginLeft: "70%" }}>
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(share.postId.createdAt).toLocaleDateString()}
                  </p>
                </NavLink>
              </li>
            ))
          ) : (
            <p style={{ color: "white" }}>Chưa có bài blog nào</p>
          )}
        </ul>
      </div>
    </>
  );
};
