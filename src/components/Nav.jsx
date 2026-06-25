import { useState } from "react";

import { useModalStore, useMapStore } from "../stores/hooks";

import AlertModal from "../modals/Alert";
import QuestionModal from "../modals/Question";

import ShareIcon from "../assets/share-b.png";
import ShareIconHovered from "../assets/share-g.png";
import Logo from "../assets/logo.gif";
import QuestionIcon from "../assets/question-b.png";
import QuestionIconHovered from "../assets/question-g.png";

const ShareButton = () => {
  const { openModal, closeModal } = useModalStore();

  const [isHovered, setIsHovered] = useState(false);

  const handleClickShare = () => {
    navigator.clipboard.writeText("https://ocean.greenkorea.org/");

    openModal(
      <AlertModal
        key="alert-modal"
        text={`주소가 복사되었습니다.\n원하는 곳에 붙여넣어 보세요!`}
      />,
    );

    setTimeout(() => {
      closeModal();
    }, 3000);
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
  const { openModal } = useModalStore();

  const [isHovered, setIsHovered] = useState(false);

  const handleClickQuestion = () => {
    openModal(<QuestionModal key="question-modal" />);
  };

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClickQuestion}
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
  const { setActiveTab } = useMapStore();

  const handleClickLogo = () => {
    setActiveTab("all");
  };

  return (
    <nav className="flex justify-between items-center pt-64 pb-40">
      <div>
        <ShareButton />
      </div>
      <div>
        <div className="cursor-pointer" onClick={handleClickLogo}>
          <img src={Logo} alt="logo" className="w-[387px]" />
        </div>
      </div>
      <div>
        <QuestionButton />
      </div>
    </nav>
  );
};

export default Nav;
