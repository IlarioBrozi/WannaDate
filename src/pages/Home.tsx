import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CatHeart from "@/assets/CatHeart.png";
import CatBrokenHeart from "@/assets/CatBrokenHeart.png";
import CatAngry from "@/assets/CatAngry.png";

type ButtonRect = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export default function Home() {
  const [clickCount, setClickCount] = useState<number>(0);
  const noButton = useRef<HTMLButtonElement>(null);
  const yesButton = useRef<HTMLButtonElement>(null);

  function getRandomPosition(): { top: number; left: number } {
    const randomX = Math.floor(Math.random() * (window.innerWidth - 120));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 60));
    return { top: randomY, left: randomX };
  }

  function isOverlapping(
    yesButtonRect: DOMRect,
    noButtonRect: ButtonRect
  ): boolean {
    return (
      yesButtonRect.left < noButtonRect.right &&
      yesButtonRect.right > noButtonRect.left &&
      yesButtonRect.top < noButtonRect.bottom &&
      yesButtonRect.bottom > noButtonRect.top
    );
  }

  function randomlyPositionNoButton() {
    const yesButtonRect = yesButton.current!.getBoundingClientRect();

    let newPosition = getRandomPosition();
    let noButtonRect: ButtonRect = {
      top: newPosition.top,
      left: newPosition.left,
      bottom: newPosition.top + noButton.current!.offsetHeight,
      right: newPosition.left + noButton.current!.offsetWidth
    };

    while (isOverlapping(yesButtonRect, noButtonRect)) {
      newPosition = getRandomPosition();
      noButtonRect = {
        top: newPosition.top,
        left: newPosition.left,
        bottom: newPosition.top + noButton.current!.offsetHeight,
        right: newPosition.left + noButton.current!.offsetWidth
      };
    }

    if (!noButton.current!.classList.contains("absolute")) {
      noButton.current!.classList.add("absolute", "z-20");
    }
    noButton.current!.style.top = `${newPosition.top}px`;
    noButton.current!.style.left = `${newPosition.left}px`;

    setClickCount(prev => prev + 1);
  }

  return (
    <main>
      <h1 className="text-center text-2xl font-black">
        Do you wanna go out on a date with me?
      </h1>

      <div className="relative">
        <img
          src={CatHeart}
          alt="A cat holding a heart"
          className="mx-auto my-8 w-full max-w-80"
        />

        <img
          src={CatBrokenHeart}
          alt="A sad cat sits in the corner, heartbroken and defeated."
          className="absolute inset-0 mx-auto my-8 w-full max-w-80"
          style={{ zIndex: clickCount < 6 && clickCount >= 3 ? 10 : -10 }}
        />

        <img
          src={CatAngry}
          alt="A crying cat rising a middle paw"
          className="absolute inset-0 mx-auto my-8 w-full max-w-80"
          style={{ zIndex: clickCount >= 6 ? 10 : -10 }}
        />
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/WannaDate/choose-date-day">
          <button
            ref={yesButton}
            className="rounded-sm bg-green-500 px-6 py-3 text-white shadow-md transition-all">
            Yes
          </button>
        </Link>
        <button
          ref={noButton}
          className="rounded-sm bg-red-500 px-6 py-3 text-white shadow-md transition-all"
          onClick={() => randomlyPositionNoButton()}
          onMouseOver={() => randomlyPositionNoButton()}>
          {clickCount >= 6 ? "Fuck you" : "No"}
        </button>
      </div>
    </main>
  );
}
