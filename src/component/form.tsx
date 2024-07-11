// BlogForm.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/index.scss";
import { nameUser } from "../user/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Blog } from "../interface/blog";

interface CheckProp {
  isCheck: boolean;
}

interface BlogApiResponse {
  data: Blog;
  status_code: number;
  errors: any[];
}

const BlogForm: React.FC<CheckProp> = ({ isCheck }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>(nameUser);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft"
  );
  const [views, setViews] = useState<number>(0);
  const { blogId } = useParams<{ blogId: string }>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  //tạo blog
  const handleSubmitCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("tags", tags.join(","));
    if (image) formData.append("image", image);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("views", views.toString());
    try {
      await axios.post("http://localhost:5050/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(() => <p>Thêm Thành Công</p>);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(() => (
        <p>There was an error creating the blog! {errorMessage}</p>
      ));
    }
  };

  //get blog by id
  useEffect(() => {
    if (isCheck && blogId) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get<BlogApiResponse>(
            `http://localhost:5050/blogs/${blogId}`
          );
          if (response.data.status_code === 200) {
            setBlog(response.data.data);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setAuthor(response.data.data.author);
            setCategory(response.data.data.category);
            setViews(response.data.data.views);
          }
        } catch (error: any) {
          console.error(error);
        }
      };

      fetchBlog();
    }
  }, [blogId, isCheck]);

  //update blog
  const handleSubmitUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (content) formData.append("content", content);
    if (author) formData.append("author", author);
    if (tags.length) formData.append("tags", tags.join(","));
    if (image) formData.append("image", image);
    if (category) formData.append("category", category);
    if (status) formData.append("status", status);
    if (views) formData.append("views", views.toString());

    fetch(`http://localhost:5050/blogs/${blogId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status_code === 200) {
          toast.success(() => (
            <p style={{ paddingTop: "1rem" }}>Cập nhật Thành Công</p>
          ));
        } else {
          toast.error(() => (
            <p style={{ paddingTop: "1rem" }}>Cập nhật Thất bại </p>
          ));
        }
      });
  };
  return (
    <div id="box-create-blog">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px", height: "110px" }}
      />
      <div id="blog-form-container">
        <h2>{isCheck ? "Update" : "Create"} Blog</h2>
        <form onSubmit={isCheck ? handleSubmitUpdate : handleSubmitCreate}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled
            />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma separated):</label>
            <input
              type="text"
              id="tags"
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(e.target.value.split(",").map((tag) => tag.trim()))
              }
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published" | "archived")
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label htmlFor="views">Views:</label>
            <input
              type="number"
              id="views"
              value={views}
              onChange={(e) => setViews(Number(e.target.value))}
            />
          </div>
          <button
            className={`btn ${isCheck ? "btn-success" : "btn-primary"}`}
            type="submit"
          >
            {isCheck ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
