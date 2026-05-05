// src/components/student/QuizComponent.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { useGamification } from '../../context/GamificationContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const { earnRewards } = useGamification();

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      onComplete(score + (selectedOption === questions[currentQuestion].correctAnswer ? 1 : 0));
      // Reward
      earnRewards(10, 20, 'Completed Micro-Quiz');
    }
  };

  if (quizFinished) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;

    return (
      <div className="text-center py-10 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto"
        >
          <Trophy size={40} />
        </motion.div>
        <h3 className="text-2xl font-bold text-primary font-poppins">Quiz Completed!</h3>
        <p className="text-gray-500">You scored {finalScore} out of {questions.length} ({percentage}%)</p>
        <div className="flex justify-center gap-4">
          <div className="bg-orange-50 p-4 rounded-xl text-orange-600 font-bold">
            +10 EduCoins 🪙
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600 font-bold">
            +20 XP ✨
          </div>
        </div>
        <Button className="bg-accent text-white" onClick={() => window.location.reload()}>
          Back to Path
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question {currentQuestion + 1} / {questions.length}</span>
        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary leading-tight font-poppins">{question.question}</h3>

      <div className="grid gap-3">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrect = i === question.correctAnswer;
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleOptionSelect(i)}
              disabled={showResult}
              className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between ${
                showResult && isCorrect ? 'bg-green-50 border-green-500 text-green-700' :
                isWrong ? 'bg-red-50 border-red-500 text-red-700' :
                isSelected ? 'border-accent bg-orange-50' :
                'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <span className="font-medium text-sm">{option}</span>
              {showResult && isCorrect && <CheckCircle2 size={18} className="text-green-500" />}
              {isWrong && <XCircle size={18} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold text-primary block mb-1">Explanation:</span>
              {question.explanation}
            </p>
            <Button 
              className="mt-4 w-full bg-navy-dark text-white font-bold"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;
