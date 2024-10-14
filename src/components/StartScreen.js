import { useQuize } from "../context/QuizContext";

function StartScreen() {
  const { numQuestions, dispath } = useQuize();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispath({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
