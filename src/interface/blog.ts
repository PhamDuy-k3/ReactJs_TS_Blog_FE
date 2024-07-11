export interface Blog {
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
    approvedAt: Date;
  }