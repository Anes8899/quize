import { useEffect } from "react";
import { useQuize } from "../context/QuizContext";

function Timer() {
  const { dispath, secondereminder } = useQuize();
  const min = Math.floor(secondereminder / 60);
  const sec = secondereminder % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispath({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispath]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
