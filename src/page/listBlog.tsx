import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import { ElementBlog } from "../component/elementBlog";
import BasicExample from "../component/spinner";

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

interface BlogApiResponse {
  data: Blog[];
  status_code: number;
  errors: any[];
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<BlogApiResponse>(
          `http://localhost:5050/blogs/?title=${title}`
        );
        if (response.data.status_code === 200) {
          setBlogs(response.data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (error: any) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

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
          borderRadius:"15px",
          height: "2rem",
        }}
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Tìm kiếm ..."
      />
      <ElementBlog blogs={blogs} />
    </div>
  );
};

export default BlogList;
