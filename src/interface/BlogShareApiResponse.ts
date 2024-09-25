import { IBlogShare } from "./BlogShare";

export interface BlogShareApiResponse {
    data: IBlogShare[];
    status_code: number;
    errors: any[];
  }