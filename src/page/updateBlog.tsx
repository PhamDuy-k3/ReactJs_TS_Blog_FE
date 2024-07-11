// UpdateBlog.tsx
import React, { useState } from "react";
import "../style/index.scss";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "../component/form";

const UpdateBlog: React.FC = () => {
  const [isCheck, setIscheck] = useState<boolean>(true);
  return <BlogForm isCheck={isCheck} />;
};

export default UpdateBlog;
