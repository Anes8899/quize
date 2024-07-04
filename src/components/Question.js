import Option from "./Option";

function Question({ question, disPath, answer }) {
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Option answer={answer} question={question} disPath={disPath} />
    </div>
  );
}

export default Question;
