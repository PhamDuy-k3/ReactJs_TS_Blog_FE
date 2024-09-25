import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ShareButtonProps {
  postId: string;
  nameUser: string;
  fetchSharedPosts: () => void;
}

const Shares: React.FC<ShareButtonProps> = ({
  postId,
  nameUser,
  fetchSharedPosts,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Hàm chia sẻ bài viết
  const handleShare = async (): Promise<void> => {
    try {
      const res = await axios.post("http://localhost:5050/shares", {
        nameUser,
        postId,
        message,
      });

      if (res.data.success) {
        alert("Bài viết đã được chia sẻ!");
      }
      fetchSharedPosts();
    } catch (error) {
      console.error("Lỗi chia sẻ bài viết:", error);
    }
  };

  // Đóng modal và chia sẻ bài viết
  const handleClose = (): void => {
    handleShare();
    setShow(false);
    setMessage("");
  };

  // Mở modal
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Button
        style={{ marginLeft: "86%" }}
        variant="primary"
        onClick={handleShow}
      >
        Chia sẻ
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chia sẻ blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            placeholder="Viết thông điệp chia sẻ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ marginLeft: "85%" }}
            variant="primary"
            onClick={handleClose}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Shares;
