function NextQuestion({ disPath, answer, numQuestion, index }) {
  if (answer === null) return null;
  if (index < numQuestion - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => disPath({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (index === numQuestion - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => disPath({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextQuestion;
