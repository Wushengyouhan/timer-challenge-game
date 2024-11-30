import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
//let timer;
//定义在这点timer是所有定时器组件共用的
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemainning, setTimeRemainning] = useState(targetTime * 1000);

  const timerIsActive =
    timeRemainning > 0 && timeRemainning < targetTime * 1000;

  if (timeRemainning <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemainning(targetTime * 1000);
  }

  //let timer;
  //定义在这的timer组件重新渲染后就丢失了
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemainning((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemainning}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
