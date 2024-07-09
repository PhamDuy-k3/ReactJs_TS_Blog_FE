import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import { ElementBlog } from "../component/elementBlog";
import { nameUser } from "../user/user";

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

const MyBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<BlogApiResponse>(
          `http://localhost:5050/blogs/?author=${nameUser}`
        );
        if (response.data.status_code === 200) {
          setBlogs(response.data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (error: any) {
        console.error(error);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="box">
      <h1> My Blogs</h1>
      <ElementBlog blogs={blogs} />
    </div>
  );
};

export default MyBlog;
