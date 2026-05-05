import { useState } from "react";

import { useModalStore } from "../stores/hooks";

import AlertModal from "../modals/Alert";

import ShareIcon from "../assets/share-b.png";
import ShareIconHovered from "../assets/share-g.png";
import Logo from "../assets/logo.png";
import QuestionIcon from "../assets/question-b.png";
import QuestionIconHovered from "../assets/question-g.png";

const ShareButton = () => {
  const { openModal } = useModalStore();

  const [isHovered, setIsHovered] = useState(false);

  const handleClickShare = () => {
    openModal(<AlertModal key="alert-modal" />);
  };

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClickShare}
    >
      <div
        className="w-60 h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${isHovered ? ShareIconHovered : ShareIcon})`,
        }}
      />
    </button>
  );
};

const QuestionButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-60 h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${isHovered ? QuestionIconHovered : QuestionIcon})`,
        }}
      />
    </button>
  );
};

const Nav = () => {
  return (
    <nav className="flex justify-between items-end pt-64 pb-12">
      <div>
        <ShareButton />
      </div>
      <div>
        <img src={Logo} alt="logo" className="w-[337px]" />
      </div>
      <div>
        <QuestionButton />
      </div>
    </nav>
  );
};

export default Nav;
