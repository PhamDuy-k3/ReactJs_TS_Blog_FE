import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { nameUser } from "../user/user";
import "../style/index.scss";
import img from "../img/blogImage.jpg";

interface PropId {
  blogId: string | undefined;
}

interface IComment {
  _id: string;
  blogId: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentgApiResponse {
  data: IComment[];
  status_code: number;
  errors: any[];
}

export const Comments: React.FC<PropId> = ({ blogId }) => {
  const [author] = useState<string>(nameUser);
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);
  const inputComment = useRef<HTMLInputElement>(null);

  const fetchComments = useCallback(async () => {
    if (!blogId) return;

    try {
      const response = await axios.get<CommentgApiResponse>(
        `http://localhost:5050/comments/${blogId}`
      );
      if (response.data.status_code === 200) {
        setComments(response.data.data);
      } else {
      }
    } catch (error: any) {
      console.error("There was an error fetching the comments!", error);
    }
  }, [blogId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content.trim() === "") {
      if (inputComment.current) inputComment.current.focus();
      return;
    }
    const commentData = {
      content,
      author,
      blogId,
    };

    try {
      await axios.post("http://localhost:5050/comments", commentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setContent(""); 
      fetchComments(); 
    } catch (error) {
      console.error("There was an error creating the comment!", error);
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    fetchComments(); 
  }, [fetchComments]);
//useCallback: Ghi nhớ hàm fetchComments để nó không thay đổi qua các lần render trừ khi phụ thuộc của nó (ở đây là blogId) thay đổi.
//useEffect: Chạy fetchComments mỗi khi hàm fetchComments thay đổi (tức là khi blogId thay đổi).
  return (
    <div id="comment">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputComment}
          type="text"
          onChange={handleContent}
          value={content}
          placeholder="Nhập bình luận ... "
        />
        <button type="submit">Gửi</button>
      </form>
      <div id="list-comment">
        {comments.length > 0 ? (
          comments.map((comment: IComment) => (
            <div key={comment._id} className="item-comment-img">
              <img src={img} alt="img" />
              <div className="item-comment">
                <p className="author">{comment.author}</p>
                <p className="content">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};
