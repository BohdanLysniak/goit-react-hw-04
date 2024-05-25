import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({
  onOpen,
  onClose,
  styles,
  modalImageUrl,
  modalImageAlt
}) {
  return (
    <Modal
      isOpen={onOpen}
      onRequestClose={onClose}
      style={styles}
      contentLabel="Modal image"
    >
      <img src={modalImageUrl} alt={modalImageAlt} />
      {console.log(modalImageUrl)}
    </Modal>
  );
}
