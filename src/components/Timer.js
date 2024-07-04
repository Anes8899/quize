import { useEffect } from "react";

function Timer({ disPath, secondereminder }) {
  const min = Math.floor(secondereminder / 60);
  const sec = secondereminder % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        disPath({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [disPath]
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
