import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  category: string;
  status: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  approvedAt: Date;
}

interface ElementBlogProps {
  blogs: Blog[];
  isApproval: boolean;
  fetchBlogs: () => void; // Receive fetchBlogs as a prop
}

export const ElementBlog: React.FC<ElementBlogProps> = ({
  blogs,
  isApproval,
  fetchBlogs, // Destructure fetchBlogs
}) => {
  const [showAction, setShowAction] = useState<{ [key: string]: boolean }>({});

  const handleApprove = async (blogId: string) => {
    try {
      const approvalDate = new Date();
      await axios.put(`http://localhost:5050/blogs/${blogId}/blogApproval`, {
        approvalStatus: "approved",
        approvedAt: approvalDate,
        approvedBy: "Phạm Duy",
      });
      fetchBlogs();
    } catch (error) {
      console.error("Failed to approve blog", error);
    }
  };

  const toggleAction = (id: string) => {
    setShowAction((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  console.log(showAction); //{668e0ad2afe031ca04114503: true}
  //=> showAction[id] //true
  // !underfine = true
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
              <p id="action">
                <FaEllipsisVertical onClick={() => toggleAction(blog._id)} />
              </p>
              {showAction[blog._id] && (
                <div id="box-action">
                  <p onClick={() => deleteBlog(blog._id)}>Xóa</p>
                  <NavLink to={`/blogs/updateBlog/${blog._id}`}>
                    <p>Chỉnh sửa</p>
                  </NavLink>
                </div>
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
            </li>
          ))
        ) : (
          <p style={{ color: "white" }}>Chưa có bài blog nào</p>
        )}
      </ul>
    </div>
  );
};
