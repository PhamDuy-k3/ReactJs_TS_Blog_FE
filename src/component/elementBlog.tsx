import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { nameAdmin, nameUser } from "../user/user";
import Shares from "./model";
import { Blog } from "../interface/blog";

interface ElementBlogProps {
  blogs: Blog[];
  isApproval: boolean;
  fetchBlogs: () => void;
  fetchSharedPosts: () => void;
}

export const ElementBlog: React.FC<ElementBlogProps> = ({
  blogs,
  isApproval,
  fetchBlogs, // Destructure fetchBlogs
  fetchSharedPosts,
}) => {
  const [showActions, setShowActions] = useState<string[]>([]);

  const [isCheckUpdate, setCheckUpdate] = useState<boolean>(true);
  const [author, setAuthor] = useState<string>("");

  const handleApprove = async (blogId: string): Promise<void> => {
    try {
      const approvalDate = new Date();
      await axios.put(`http://localhost:5050/blogs/${blogId}/blogApproval`, {
        approvalStatus: "approved",
        approvedAt: approvalDate,
        approvedBy: nameAdmin,
      });
      fetchBlogs();
    } catch (error) {
      console.error("Failed to approve blog", error);
    }
  };

  useEffect(() => {
    if (nameUser === nameAdmin) {
      setCheckUpdate(false);
    }
  });

  const toggleAction = (id: string) => {
    if (showActions.includes(id)) {
      setShowActions(showActions.filter((item) => item !== id));
    } else {
      if (showActions.length === 1) {
        setShowActions([id]);
      } else {
        setShowActions([...showActions, id]);
      }
    }
  };
  console.log(showActions);
  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5050/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  return (
    <div className="blogs">
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog: Blog) => (
            <li key={blog._id}>
              {(blog.author === nameUser || nameUser === nameAdmin) && (
                <>
                  <p id="action">
                    <FaEllipsisVertical
                      onClick={() => toggleAction(blog._id)}
                    />
                  </p>
                  {showActions.includes(blog._id) && (
                    <div id="box-action">
                      <p onClick={() => deleteBlog(blog._id)}>Xóa</p>
                      {isCheckUpdate && (
                        <NavLink
                          className="nav-link"
                          to={`/blogs/updateBlog/${blog._id}`}
                        >
                          <p>Chỉnh sửa</p>
                        </NavLink>
                      )}
                    </div>
                  )}
                </>
              )}

              <NavLink className="nav-link" to={`/blogs/${blog._id}`}>
                <h2>{blog.title}</h2>

                <img src={blog.image} alt={blog.title} />
                <p style={{ fontWeight: "bold" }}>{blog.author}</p>
                <p>
                  <strong>Lượt xem:</strong> {blog.views}
                </p>
                <p>{blog.content.substring(0, 80)}...</p>
                <p style={{ marginLeft: "70%" }}>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </NavLink>
              {isApproval && (
                <button
                  onClick={() => handleApprove(blog._id)}
                  style={{ marginLeft: "70%" }}
                >
                  Phê duyệt
                </button>
              )}
              <Shares
                fetchSharedPosts={fetchSharedPosts}
                nameUser={nameUser}
                postId={blog._id}
              />
            </li>
          ))
        ) : (
          <p style={{ color: "white" }}>Chưa có bài blog nào</p>
        )}
      </ul>
    </div>
  );
};
