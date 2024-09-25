import { Blog } from "./blog";

export interface BlogApiResponse {
    data: Blog[];
    status_code: number;
    errors: any[];
  }