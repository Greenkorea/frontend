import { useState, useEffect, useRef } from "react";

import { useModalStore } from "../stores/hooks";

import ThirtyByThirtyModal from "../modals/ThirtyByThirty";

import Icon30 from "../assets/thirty.png";

const FloatingButton = () => {
  const { openModal } = useModalStore();

  const [position, setPosition] = useState({ x: 500, y: 300 });
  const velocity = useRef({ x: 1, y: 1 });
  const isPaused = useRef(false);
  const animationRef = useRef(null);
  const positionRef = useRef({ x: 500, y: 300 });

  useEffect(() => {
    const buttonSize = 100;

    const animate = () => {
      if (!isPaused.current) {
        const next = {
          x: positionRef.current.x + velocity.current.x,
          y: positionRef.current.y + velocity.current.y,
        };

        // 벽에 튕기기
        if (next.x <= 0 || next.x >= window.innerWidth - buttonSize) {
          velocity.current.x *= -1;
        }
        if (next.y <= 0 || next.y >= window.innerHeight - buttonSize) {
          velocity.current.y *= -1;
        }

        positionRef.current = next;
        setPosition({ ...next });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleClick = () => {
    openModal(<ThirtyByThirtyModal key="thirty-by-thirty-modal" />);
  };

  return (
    <div
      style={{ left: position.x, top: position.y }}
      className="fixed cursor-pointer select-none z-[1000]"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      onClick={handleClick}
    >
      <img
        src={Icon30}
        alt="30"
        className="w-94 h-94 animate-spin"
        style={{ animationDuration: "3s" }}
      />
    </div>
  );
};

export default FloatingButton;
