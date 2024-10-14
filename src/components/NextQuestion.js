import { useQuize } from "../context/QuizContext";

function NextQuestion() {
  const { dispath, answer, numQuestions, index } = useQuize();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispath({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispath({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextQuestion;
