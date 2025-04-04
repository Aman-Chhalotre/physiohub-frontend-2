"use client";
import { ArrowLeft, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import run from "../../components/animations/data/Happy.json";
import cry from "../../components/animations/data/Cry.json";
import LottiePlayer from "../../components/animations/LottiePlayer";
import SignInBanner from "../../components/signInBanner/SignInBanner.js";
import { IoIosCheckmark } from "react-icons/io";

const questions = [
  {
    question:
      "A 25-year-old man comes to the emergency department because of acute onset hoarseness of voice within the past 3 days. He also reports coughing, frequent throat clearing, and flu-like symptoms. He reports having an upper respiratory infection from babysitting his younger cousin 5 days ago. A laryngoscopy is done and shows erythematous and oedematous laryngeal tissue. Which of the following is the next best step in management for this patient?",
    options: [
      {
        id: "A",
        text: "90% inorganic material & 10% organic material",
        correct: false,
      },
      {
        id: "B",
        text: "35% inorganic material & 65% organic material",
        correct: true,
      },
      {
        id: "C",
        text: "50% inorganic material & 50% organic material",
        correct: false,
      },
      {
        id: "D",
        text: "65% inorganic material & 35% organic material",
        correct: false,
      },
    ],
    explanation:
      "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
    image: "http://example.jpg",
    type: "chooseTheCorrect",
  },
  {
    question:
      "Which structure is responsible for producing cerebrospinal fluid?",
    answer : "abcd",
    explanation:
      "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
    type: "text",
  },
  {
    question:
      "What are the common goals of physiotherapy for patients with stroke? (Select all that apply)",
    options: [
      { id: "A", text: "Choroid Plexus" },
      { id: "B", text: "Pineal Gland" },
      { id: "C", text: "Cerebellum" },
      { id: "D", text: "Thalamus" },
    ],
    explanation:
      "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
    type: "multipleChoice",
  },
];

export default function QuizCard() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [explanation, setExplanation] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [multipleOptions, setMultipleOptions] = useState([]);
    const [textAnswer, setTextAnswer] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(150);
    
    useEffect(() => {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);
    
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
    
    const handleCheckAnswer = () => {
      if (isAnswered) return;
    
      const current = questions[currentQuestion];
      let correct = false;
    
      if (current.type === "multipleChoice") {
        const correctAnswers = current.options
          .filter((opt) => opt.correct)
          .map((opt) => opt.id);
    
        correct = multipleOptions.length === correctAnswers.length &&
          multipleOptions.every((id) => correctAnswers.includes(id));
      } else if (current.type === "chooseTheCorrect") {
        const correctAnswer = current.options.find((opt) => opt.correct)?.id;
        correct = selectedOption === correctAnswer;
      } else if (current.type === "text") {
        const correctAnswer = current.answer?.toLowerCase().trim();
        correct = textAnswer.toLowerCase().trim() === correctAnswer;
      }
    
      setIsCorrect(correct);
      setExplanation(current.explanation || "");
      setIsAnswered(true);
    };
    
    const handleOptionChange = (optionId) => {
      if (isAnswered) return;
    
      const current = questions[currentQuestion];
    
      if (current.type === "multipleChoice") {
        if (multipleOptions.includes(optionId)) {
          setMultipleOptions((prev) => prev.filter((id) => id !== optionId));
        } else {
          setMultipleOptions((prev) => [...prev, optionId]);
        }
      } else if (current.type === "chooseTheCorrect") {
        setSelectedOption(optionId);
      }
    };
    
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setIsAnswered(false);
        setSelectedOption(null);
        setMultipleOptions([]);
        setTextAnswer("");
        setExplanation("");
      } else {
        alert("🎉 Quiz completed!");
      }
    };
    
    const handleBack = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
        setIsAnswered(false);
        setSelectedOption(null);
        setMultipleOptions([]);
        setTextAnswer("");
        setExplanation("");
      }
    };
    
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-center mb-5">
        <ArrowLeft
          className="text-gray-600 cursor-pointer"
          size={24}
          onClick={handleBack}
        />
        <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
          <div className="w-[25%] h-full bg-[#6c4ce6] rounded-full"></div>
        </div>
      </div>
      <SignInBanner />
      <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-md py-2 px-2">
        <div className="flex items-center space-x-3">
          <img
            src="/user-avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-gray-900 font-semibold">Devon Lane</h2>
        </div>
        <div className="text-gray-600 text-sm">
          <span className="font-semibold">Time remaining</span>
          <div className="text-lg text-blue-600 font-bold text-center">
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="text-gray-700 font-semibold">24 Points ⭐</div>
      </div>

      <div className="my-10">
        <h3 className="text-xs border-s-2 border-blue-600 ps-2 mb-3 text-gray-400 uppercase font-semibold">
          Question {currentQuestion + 1} of {questions.length} • Chapter Anatomy
        </h3>
        {questions[currentQuestion].image && (
          <div className="w-52 h-52 rounded-md justify-self-center">
            <img className="w-full h-full" />
          </div>
        )}
        <p className="text-gray-800 mt-2 text-[15px]">
          {questions[currentQuestion].question}
        </p>

        {isAnswered && !isCorrect && (
          <div className="w-full py-2 px-3 bg-[#E2F9FC] mt-3 rounded-md text-sm border border-green-300">
            <p>
              <span className="font-semibold">
                The Correc Answer is {selectedAnswer.id}. {selectedAnswer.text}.{" "}
              </span>
              {explanation}
            </p>
          </div>
        )}

        <div className="mt-8 mb-10 space-y-2">
          {questions[currentQuestion].type == "chooseTheCorrect" &&
            questions[currentQuestion].options.map((option) => {
              let borderColor = "border-gray-300";
              let bgColor = "";
              if (
                isAnswered &&
                selectedOption === option.id &&
                !option.correct
              ) {
                borderColor = "border-red-500"; // Wrong answer gets a red border
                bgColor = "bg-red-50";
              }

              return (
                <label
                  key={option.id}
                  className={`flex items-center p-2 border rounded-lg cursor-pointer gap-2 ${borderColor} ${bgColor} ${
                    selectedOption === option.id
                      ? "border-[#6C4CE6] bg-purple-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz"
                    className="hidden"
                    onChange={() => {
                      setSelectedOption(option.id);
                      setSelectedAnswer(option);
                    }}
                    disabled={isAnswered}
                  />
                  <div
                    className={`py-1 px-3 rounded ${
                      selectedOption === option.id
                        ? isAnswered && !isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-[#6C4CE6] text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {option.id}
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold">{option.text}</p>
                    <span className="w-6 h-6 border-2 rounded-full flex items-center justify-center mr-3">
                      {selectedOption === option.id && (
                        <span
                          className={`w-3 h-3 ${
                            isAnswered && !isCorrect && "bg-red-500"
                          } bg-[#6C4CE6] rounded-full`}
                        ></span>
                      )}
                    </span>
                  </div>
                </label>
              );
            })}
          {questions[currentQuestion].type == "text" && (
            <div className="w-full">
              <textarea
                name=""
                id=""
                placeholder="Enter your answer here..."
                className="w-full h-full p-2 bg-gray-50 border rounded-md"
                rows={5}
                onChange={(e)=>{setTextAnswer(e.target.value)}}
              ></textarea>
            </div>
          )}
          {questions[currentQuestion].type == "multipleChoice" &&
            questions[currentQuestion].options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-2 border rounded-lg cursor-pointer gap-2 ${
                    multipleOptions.includes(option.id)
                    ? "bg-purple-50 border-[#6C4CE6]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => {
                    if (multipleOptions.includes(option.id)) {
                        setMultipleOptions(
                        multipleOptions.filter((id) => id !== option.id)
                      );
                    } else {
                        setMultipleOptions([...multipleOptions, option.id]);
                    }
                  }}
                  checked={multipleOptions.includes(option.id)}
                  disabled={isAnswered}
                />
                <div
                  className={`py-1 px-3 rounded ${
                    multipleOptions.includes(option.id)
                      ? "bg-[#6C4CE6] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {option.id}
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-sm font-semibold">{option.text}</p>
                  <span className="w-6 h-6 border-2 rounded flex items-center justify-center mr-3">
                    {multipleOptions.includes(option.id) && (
                      <span className="w-6 h-6 bg-[#6C4CE6] flex items-center justify-center rounded    "><IoIosCheckmark className="text-white text-2xl"/></span>
                    )}
                  </span>
                </div>
              </label>
            ))}
            
        </div>

        {isAnswered && (
          <div
            className={`flex items-center ${
              isCorrect ? "flex-row left-[40%]" : "flex-row-reverse left-[35%]"
            } gap-5 absolute   -translate-y-35  justify-self-center`}
          >
            <div className="mt-4 p-3 border rounded-lg bg-white shadow-md space-x-3 max-w-[300px]">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white`}
              >
                {isCorrect ? (
                  <FaCircleCheck className="text-green-300 size-10" />
                ) : (
                  <RxCrossCircled className="text-red-500 size-10" />
                )}
              </span>
              <div>
                <h3 className="font-semibold">
                  {isCorrect ? "Great job!" : "Oops, that's not quite right!"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCorrect
                    ? "You've answered correctly."
                    : "Don't worry, mistakes help you learn."}
                </p>
                <p className="text-sm text-gray-600">
                  {isCorrect
                    ? " Keep up the good work"
                    : " Here's the correct answer and an explanation."}
                </p>
              </div>
            </div>
            {isCorrect ? (
              <LottiePlayer animationFile={run} width="100px" height="100px" />
            ) : (
              <LottiePlayer animationFile={cry} width="100px" height="100px" />
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <button className="text-gray-600 hover:underline flex items-center gap-2">
          <Flag size={16} />
          Report
        </button>
        <div className="space-x-4">
          <button
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={handleNext}
          >
            Skip
          </button>
          {!isAnswered ? (
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                selectedOption || textAnswer.length > 0 || multipleOptions.length > 0 ? "bg-[#6C4CE6]" : "bg-gray-300"
              }`}
              disabled={!(selectedOption || textAnswer.length > 0 || multipleOptions.length > 0)}
              onClick={handleCheckAnswer}
            >
              Check Answer
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-[#6C4CE6] text-white"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
