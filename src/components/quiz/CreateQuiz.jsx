"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp, PlusCircle, Trash2, Upload } from "lucide-react";
import { Select } from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textArea.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Button } from "@/components/ui/button.jsx";
import PublishQuizHeader from "@/components/quiz/PublishQuizHeader.jsx";

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([{ id: 1, options: ["", "", "", ""], open: true }]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, options: ["", "", "", ""], open: false }]);
  };

  const toggleQuestion = (index) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, open: !q.open } : q))
    );
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <>
      <PublishQuizHeader />
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
      {/* Cover Image Upload */}
      <div className="mb-4 space-y-4">
        <label className="block text-gray-700">Cover</label>
        <div className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <Upload className="md:w-6 w-3 md:h-6 h-3 mb-2 text-purple-600" />
            <p className="md:text-base text-sm">Drag or drop image here</p>
            <p className="md:text-xs text-[10px]">
              Image should be horizontal, at least 1500 x 500 px
            </p>
          </div>
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Thumbnail</label>
        <div className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <Upload className="w-6 h-6 mb-2 text-purple-600" />
            <p>Drag or drop image here</p>
            <p className="text-xs">
              Image should be horizontal, at least 1500 x 500 px
            </p>
          </div>
      </div>

      {/* Quiz and Card Topic Selection */}
      <div className="mb-4">
        <label className="block text-gray-700">Quiz Topic</label>
        <Select className="w-full">
          <option>Choose category</option>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Card Topic</label>
        <Select className="w-full">
          <option>Choose category</option>
        </Select>
      </div>

      {/* Questions Section */}
      <div className="mb-4 space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg" onClick={() => toggleQuestion(index)}>
              <span className="text-gray-700 font-medium">Question {q.id}</span>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeQuestion(index); }}>
                  <Trash2 size={16} className="text-red-500" />
                </button>
                {q.open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {q.open && (
              <div className="mt-3">
                <div className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <Upload className="w-6 h-6 mb-2 text-purple-600" />
            <p>Thumbnail Upload</p>
          </div>
                <Input placeholder="Write question here" className="my-5" />
                <div className="w-full grid grid-cols-2 gap-2">
                {q.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2 border p-2">
                    <input type="text" placeholder={`option ${idx+1}`} className="w-full border-none outline-none rounded-lg"/>
                    <label>Correct</label>
                    <Switch />
                  </div>
                ))}
                </div>
                <Textarea placeholder="Write explanation here..."/>
              </div>
            )}
          </div>
        ))}
        <Button onClick={addQuestion} className="flex items-center gap-2">
          <PlusCircle size={16} /> Add Question
        </Button>
      </div>
    </div>
    </>
  );
}
