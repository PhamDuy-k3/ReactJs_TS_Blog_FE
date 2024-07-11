import React from "react";
import { createHashRouter } from "react-router-dom";
import Index from "../page";
import BlogList from "../page/listBlog";
import CreateBlog from "../page/createBlog";
import { Home } from "../page/home";
import BlogDetail from "../page/blogDetail";
import MyBlog from "../page/myBlog";
import BlogApproval from "../page/blogApproval";
import UpdateBlog from "../page/updateBlog";

const router = createHashRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            element: <BlogList />,
          },
          {
            path: "create",
            element: <CreateBlog />,
          },
          {
            path: ":blogId",
            element: <BlogDetail />,
          },
          {
            path: "myBlog",
            element: <MyBlog />,
          },
          {
            path: "blogApproval",
            element: <BlogApproval />,
          },
          {
            path: "updateBlog/:blogId",
            element: <UpdateBlog />,
          },
        ],
      },
    ],
  },
]);

export default router;
