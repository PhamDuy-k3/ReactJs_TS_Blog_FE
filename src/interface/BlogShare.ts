import { Blog } from "./blog";

export interface IBlogShare {
    _id: string;
    nameUser: string
    postId: Blog
    sharedAt: Date;
    message: string;
  }