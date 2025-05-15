import { useState } from "react";
import { Input, Button, Modal } from "antd";

function NoteBox({ isOpen, onClose, onSaveNote }) {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    onSaveNote(note); // Gọi hàm lưu ghi chú từ cha
    setNote(""); // Reset lại ghi chú sau khi lưu
    onClose(); // Đóng Modal sau khi lưu ghi chú
  };

  return (
    <Modal
      title="Ghi chú"
      visible={isOpen} // Điều khiển modal mở/đóng từ prop isOpen
      onCancel={onClose} // Đóng Modal khi nhấn hủy
      footer={
        <Button
          type="primary"
          onClick={handleSaveNote}
          style={{ marginTop: 10 }}
        >
          Lưu ghi chú
        </Button>
      }
    >
      <Input.TextArea
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)} // Cập nhật ghi chú khi thay đổi
        placeholder="Ghi chú của bạn..."
      />
    </Modal>
  );
}

export default NoteBox;
