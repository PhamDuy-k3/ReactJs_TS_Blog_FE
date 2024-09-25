import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/index.scss";
import { Comments } from "../component/comment";
import { Blog } from "../interface/blog";

interface BlogApiResponse {
  data: Blog;
  status_code: number;
  errors: any[];
}

const BlogDetail: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewsIncremented, setViewsIncremented] = useState<boolean>(false);
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<BlogApiResponse>(
          `http://localhost:5050/blogs/${blogId}`
        );
        if (response.data.status_code === 200) {
          setBlog(response.data.data);
        } else {
          setError("Failed to fetch blog details");
        }
      } catch (error: any) {
        console.error(error);
        setError("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const incrementViews = async () => {
      if (!viewsIncremented) {
        try {
          await axios.put(
            `http://localhost:5050/blogs/${blogId}/increment-views`
          );
          setViewsIncremented(true);
        } catch (error) {
          console.error("Failed to increment views", error);
        }
      }
    };

    incrementViews();
  }, [blogId, viewsIncremented]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!blog) return <p>No blog found</p>;

  return (
    <div className="box-detail-blog">
      <div className="blog-detail-container">
        <h1>{blog.title}</h1>
        <p style={{ fontWeight: "bold" }}>{blog.author}</p>
        <div className="d-lg-flex flex-row">
          <h3>Thẻ</h3>
          <ul>
            {blog.tags.length > 0 ? (
              blog.tags.map((tag) => <li key={tag}>@{tag}</li>)
            ) : (
              <li>No tags available</li>
            )}
          </ul>
        </div>
        <img src={blog.image} alt={blog.title} />
        <p>
          <strong>Trạng thái:</strong> {blog.status}
        </p>
        <div id="content">
          <h3>Nội dung : </h3>
          <p>{blog.content}</p>
        </div>
        <p style={{ color: "gray", marginLeft: "70%" }}>
          <strong>Ngày lập:</strong>{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
      <Comments blogId={blogId} />
    </div>
  );
};

export default BlogDetail;
