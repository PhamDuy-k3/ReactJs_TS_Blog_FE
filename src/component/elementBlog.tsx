import React from "react";
import { NavLink } from "react-router-dom";

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
}

interface ElementBlogProps {
  blogs: Blog[];
}

export const ElementBlog: React.FC<ElementBlogProps> = ({ blogs }) => {
  return (
    <div className="blogs">
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog: Blog) => (
            <li key={blog._id}>
              <NavLink className="nav-link" to={`/blogs/${blog._id}`}>
                <h2>{blog.title}</h2>
                <img src={blog.image} alt={blog.title} />
                <p style={{fontWeight:"bold"}}>{blog.author}</p>
                <p>
                  <strong>Lượt xem:</strong> {blog.views}
                </p>
                <p>{blog.content.substring(0, 80)}...</p>
                <p style={{ marginLeft: "70%" }}>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </NavLink>
            </li>
          ))
        ) : (
          <p style={{ color: "white" }}>Chưa có bài blog nào</p>
        )}
      </ul>
    </div>
  );
};
