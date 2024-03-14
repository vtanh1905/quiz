import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

import { axiosGet, axiosPost } from "../../utils";
import { useAuth } from "../../hooks";

export default function Quizzes() {
  const {} = useAuth(true, "/login");
  const { data: quizzesResponse, isLoading: isQuizzesLoading } = useSWR(
    "/api/quizzes/65ef1f601dca25128e3f471f",
    axiosGet
  );
  const router = useRouter();

  /* Declare states */
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showNotiPopup, setShowNotiPopup] = useState(false);
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState<any>({});

  // Make sure the data was loaded
  if (isQuizzesLoading) {
    return <></>;
  }
  const percentProcessBar = (indexQuestion / quizzesResponse.data.length) * 100;
  const {
    body: question,
    answers,
    hint,
    amountCorrectAnswer,
  } = quizzesResponse.data[indexQuestion];

  const handleAnswerClick = async (answer: any) => {
    const { _id: answerId } = answer;

    // The answer used to be clicked
    if (chosenAnswers[answerId] === false) {
      return;
    }

    // Call API to check whether the answer is correct
    const {
      data: { isCorrect },
    } = await axiosPost(`/api/answers/${answerId}`);

    const newChosenAnswers = {
      ...chosenAnswers,
      [answerId]: isCorrect,
    };
    setChosenAnswers(newChosenAnswers);

    // Count a amount of correct answers that is clicked
    const countClickedCorrectAnswers = Object.values(newChosenAnswers).filter(
      (value) => value
    ).length;

    // Handle Correct Answer
    if (isCorrect && countClickedCorrectAnswers === amountCorrectAnswer) {
      setShowNotiPopup(true);
      return;
    }
  };

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  const handleNotiPopupNextButton = async () => {
    const nextIndexQuestion = indexQuestion + 1;

    // Handle Next Question
    if (nextIndexQuestion === quizzesResponse.data.length) {
      await router.push("/quizzes/done");
    }
    setIndexQuestion(nextIndexQuestion);
    setShowNotiPopup(false);
    setChosenAnswers({});
  };

  const handleGoBack = () => {
    setShowBackPopup(true);
  };

  const handleGoBackCancelButton = () => {
    setShowBackPopup(false);
  };

  const handleGoBackEndQuizButton = () => {
    router.push("/");
  };

  return (
    <>
      {/* Back Arrow */}
      <div className="flex items-center mb-4">
        {/* Back arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleGoBack}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>

      {/* Process Bar */}
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${percentProcessBar}%` }}
        >
          {percentProcessBar}%
        </div>
      </div>

      {/* Question title */}
      <h1 className="text-2xl font-bold mb-4">
        {question} ?{" "}
        {amountCorrectAnswer > 1
          ? `Please choose ${amountCorrectAnswer} answers`
          : ""}
      </h1>

      {/* Answers */}
      <div className="mt-4">
        {answers.map((answer: any, index: number) => (
          <div key={index} className="mb-2">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-left"
              onClick={() => handleAnswerClick(answer)}
            >
              {answer.body}
            </button>
            {chosenAnswers[answer._id] === false && (
              <div className="mt-2 text-red-500">Please try again!</div>
            )}
            {chosenAnswers[answer._id] === true && (
              <div className="mt-2 text-green-500">Correct</div>
            )}
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="mt-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleToggleHint}
        >
          <span className={`text-sm font-bold mr-1`}>Hint</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transform ${showHint ? "" : "rotate-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showHint ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </div>
        {showHint && (
          <div className="mt-2">
            <p className="text-sm italic">{hint}</p>
          </div>
        )}
      </div>

      {/* Notification Popup */}
      {showNotiPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg">Your answer is correct! Well done!</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              onClick={handleNotiPopupNextButton}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Go Back Popup */}
      {showBackPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Do you want to end quiz?
            </h2>
            <p className="text-lg">
              Once you end this quiz, you will have to start from the first
              question again.
            </p>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mt-4 mr-4"
              onClick={handleGoBackCancelButton}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              onClick={handleGoBackEndQuizButton}
            >
              End Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
}
