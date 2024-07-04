function FinishScreen({ points, maxPoints, highscore, disPath }) {
  const pointsPercentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        Your Score {points} out of {maxPoints} ({Math.ceil(pointsPercentage)}%)
      </p>
      <p className="highscore">(HighScore: {highscore} points)</p>
      <button
        className="btn  btn-ui"
        onClick={() => disPath({ type: "reStart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
