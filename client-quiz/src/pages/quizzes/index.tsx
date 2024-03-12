import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Quizzes() {
  const [showHint, setShowHint] = useState(false);

  const question = "What is the capital of France?";
  const answers = ["Paris", "London", "Berlin", "Rome"];
  const hint = "The city is known for the Eiffel Tower.";

  const handleAnswerClick = (answer: any) => {
    // Handle answer click logic here
    console.log(`Selected answer: ${answer}`);
  };

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  const handleGoBack = () => {};
  const showPopup = true;
  const showBackPopup = true;
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
          style={{ width: "25%" }}
        >
          25%
        </div>
      </div>

      {/* Question title */}
      <h1 className="text-2xl font-bold mb-4">{question}</h1>

      {/* Answers */}
      <div className="mt-4">
        {answers.map((answer, index) => (
          <div key={index} className="mb-2">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-left"
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
            {/* <div className="mt-2 text-red-500">Please try again!</div> */}
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
            <p className="text-sm italic">
              The city is known for the Eiffel Tower.
            </p>
          </div>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg">Your answer is correct! Well done!</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              // onClick={() => setShowPopup(false)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Popup */}
      {showBackPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Do you want to end quiz?</h2>
            <p className="text-lg">Once you end this quiz, you will have to start from the first question again.</p>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mt-4 mr-4"
              // onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              // onClick={() => setShowPopup(false)}
            >
              End Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
}
