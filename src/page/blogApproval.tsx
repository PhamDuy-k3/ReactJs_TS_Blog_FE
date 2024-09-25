import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import BasicExample from "../component/spinner";
import { ElementBlog } from "../component/elementBlog";
import { Blog } from "../interface/blog";
import { IBlogShare } from "../interface/BlogShare";
import { BlogShareApiResponse } from "../interface/BlogShareApiResponse";
import { BlogApiResponse } from "../interface/BlogApiResponse";

const BlogApproval: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isApproval, setIsApproval] = useState<boolean>(true);
  const [approvalStatus, setApprovalStatus] = useState<string>("pending");
  const [sharedPosts, setSharedPosts] = useState<IBlogShare[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<BlogApiResponse>(
        `http://localhost:5050/blogs/?title=${title}&approvalStatus=${approvalStatus}`
      );
      if (response.data.status_code === 200) {
        setBlogs(response.data.data);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (error) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };
  const fetchSharedPosts = async () => {
    try {
      const res = await axios.get<BlogShareApiResponse>(
        "http://localhost:5050/shares"
      );
      setSharedPosts(res.data.data);
    } catch (error) {
      console.error("Lỗi lấy bài viết đã chia sẻ:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (loading) return <BasicExample />;
  if (error) return <p>{error}</p>;

  return (
    <div className="box">
      <h1>Blogs</h1>
      <input
        style={{
          width: "30rem",
          marginLeft: "32%",
          borderRadius: "15px",
          height: "2rem",
        }}
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Tìm kiếm ..."
      />
      <ElementBlog
        blogs={blogs}
        isApproval={isApproval}
        fetchBlogs={fetchBlogs}
        fetchSharedPosts={fetchSharedPosts}
      />
    </div>
  );
};

export default BlogApproval;
