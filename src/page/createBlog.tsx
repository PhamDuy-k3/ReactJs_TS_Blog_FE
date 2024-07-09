// BlogForm.tsx
import React, { useState } from "react";
import axios from "axios";
import "../style/index.scss";
import { nameUser } from "../user/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BlogForm: React.FC = () => {
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      toast.error(() => <p>There was an error creating the blog! {error}</p>);
    }
  };

  return (
    <div style={{ background: "black" }}>
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
        <h2>Create a New Blog</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Create Blog</button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
