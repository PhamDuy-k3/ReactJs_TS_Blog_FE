// CreateBlog.tsx
import React, { useState } from "react";
import "../style/index.scss";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "../component/form";

const CreateBlog: React.FC = () => {
  const [isCheck, setIscheck] = useState<boolean>(false);
  return <BlogForm isCheck={isCheck} />;
};

export default CreateBlog;
