import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

import quizImage from "../../../../public/congratulations.jpg";
import { useAuth } from "../../../hooks";

const inter = Inter({ subsets: ["latin"] });

export default function QuizzesDone() {
  const {} = useAuth(true, "/login");
  const router = useRouter();

  const startQuiz = () => {
    // Handle start quiz button click
    console.log("Quiz started!");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <Image src={quizImage} alt="Quiz" className="mb-6" />
      <h1 className="text-2xl font-bold mb-6">Thank you so much</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startQuiz}
      >
        Back
      </button>
    </div>
  );
}
