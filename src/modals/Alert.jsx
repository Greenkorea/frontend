import Modal from "../components/Modal";

import CheckIcon from "../assets/check-g.png";

const AlertModal = ({ text = "" }) => {
  return (
    <Modal backdrop={false} closeBackdrop={true}>
      <div className="bg-[#89AEFF] shadow-[0_4px_15px_0_rgba(0,0,0,0.25)] p-30 text-center text-20 font-bold leading-[110%]">
        <img src={CheckIcon} alt="check" className="w-40 h-40 mb-15 mx-auto" />
        {text.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </Modal>
  );
};

export default AlertModal;
