import { useModalStore } from "../stores/hooks";

const Modal = ({ children, backdrop = true, closeBackdrop = false }) => {
  const { closeModal } = useModalStore();

  const handleCloseBackdrop = () => {
    if (closeBackdrop) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={handleCloseBackdrop}
    >
      {/* 배경 오버레이 - backdrop=false면 안보임 */}
      {backdrop && (
        <div
          className="absolute inset-0 bg-[rgba(36,143,242,0.5)]"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Modal;
