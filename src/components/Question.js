import { useQuize } from "../context/QuizContext";
import Option from "./Option";

function Question() {
  const { questions, index } = useQuize();
  const question = questions.at(index);
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}

export default Question;
