import { useQuize } from "../context/QuizContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispath } = useQuize();
  const pointsPercentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        Your Score {points} out of {maxPoints} ({Math.ceil(pointsPercentage)}%)
      </p>
      <p className="highscore">(HighScore: {highscore} points)</p>
      <button
        className="btn  btn-ui"
        onClick={() => dispath({ type: "reStart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
