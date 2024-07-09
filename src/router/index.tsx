// router.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "../page";
import BlogList from "../page/listBlog";
import CreateBlog from "../page/createBlog";
import { Home } from "../page/home";
import BlogDetail from "../page/blogDetail";
import MyBlog from "../page/myBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/blogs",
        children: [
          {
            index: true,
            element: <BlogList />,
          },
          {
            path: "/blogs/create",
            element: <CreateBlog />,
          },
          {
            path: "/blogs/:blogId",
            element: <BlogDetail />,
          },
          {
            path: "/blogs/myBlog",
            element: <MyBlog />,
          },
        ],
      },
    ],
  },
]);

export default router;
