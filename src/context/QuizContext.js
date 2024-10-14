import { createContext, useContext, useEffect, useReducer } from "react";

const QuizeContext = createContext();

const SECON_PER_QUESTION = 30;

const initState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondereminder: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "Error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondereminder: state.questions.length * SECON_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reStart":
      return {
        ...initState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondereminder: state.secondereminder - 1,
        status: state.secondereminder === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

function QuizeProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondereminder },
    dispath,
  ] = useReducer(reducer, initState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispath({ type: "dataReceived", payload: data }))
      .catch((err) => dispath({ type: "dataFailed" }));
  }, []);

  return (
    <QuizeContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondereminder,
        numQuestions,
        maxPoints,
        dispath,
      }}
    >
      {children}
    </QuizeContext.Provider>
  );
}
function useQuize() {
  const context = useContext(QuizeContext);
  if (context === undefined) throw new Error("Error");
  return context;
}
export { QuizeProvider, useQuize };
