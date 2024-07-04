import { useEffect, useReducer } from "react";
import Headers from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECON_PER_QUESTION = 30;

const initState = {
  question: [],
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
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "Error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondereminder: state.question.length * SECON_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.question.at(state.index);

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
        question: state.question,
        status: "ready",
      };
    // return {
    //   ...state,
    //   status: "ready",
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   points: 0,
    //   secondereminder: null,
    // };
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

export default function App() {
  const [
    { question, status, index, answer, points, highscore, secondereminder },
    disPath,
  ] = useReducer(reducer, initState);
  const numQuestion = question.length;
  const maxPoints = question.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => disPath({ type: "dataReceived", payload: data }))
      .catch((err) => disPath({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Headers />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} disPath={disPath} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={numQuestion}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={question[index]}
              disPath={disPath}
              answer={answer}
            />
            <Footer>
              <Timer disPath={disPath} secondereminder={secondereminder} />
              <NextQuestion
                disPath={disPath}
                answer={answer}
                numQuestion={numQuestion}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            disPath={disPath}
          />
        )}
      </Main>
    </div>
  );
}
