import { useModalStore } from "../stores/hooks";

import IconClose from "../assets/close-w.png";

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

export const Layout = ({ children, bgColor = "#89AEFF" }) => {
  return (
    <div className="bg-[#DFFC8E] [filter:drop-shadow(0px_5px_15px_rgba(0,0,0,0.25))] w-[600px] h-[600px] rounded-full flex justify-center items-center">
      <div className={`bg-[${bgColor}] w-[480px] h-[480px] p-30`}>
        {children}
      </div>
    </div>
  );
};

export const Title = ({ children }) => {
  const { closeModal } = useModalStore();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="flex justify-between items-start mb-35">
      <div className="text-32 font-bold leading-[110%] text-[#DFFC8E]">
        {children}
      </div>
      <button type="button" className="p-6" onClick={handleCloseModal}>
        <img src={IconClose} alt="닫기" className="w-18 h-18" />
      </button>
    </div>
  );
};

export default Modal;
