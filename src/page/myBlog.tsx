import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/index.scss";
import { ElementBlog } from "../component/elementBlog";
import { nameUser } from "../user/user";
import { Blog } from "../interface/blog";


interface BlogApiResponse {
  data: Blog[];
  status_code: number;
  errors: any[];
}

const MyBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApproval, setIsApproval] = useState<boolean>(false);

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
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="box">
      <h1> My Blogs</h1>
      <ElementBlog
        blogs={blogs}
        isApproval={isApproval}
        fetchBlogs={fetchBlogs} // Pass fetchBlogs function as a prop
      />
    </div>
  );
};

export default MyBlog;
