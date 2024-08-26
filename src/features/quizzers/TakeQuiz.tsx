import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizById } from './quizSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axios'; // Importez votre instance axios
import { RootState, AppDispatch } from '../../store';
import { Quiz, User } from '../types'; // Importez vos types

const TakeQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  const quiz = useSelector((state: RootState) => state.quizzes.selectedQuiz) as Quiz | null;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Array<{ question_id: number; choice_id: number }>>([]);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizById(Number(quizId)));
    }
  }, [dispatch, quizId]);

  console.log(quiz);

  // Vérifier si le quiz est en train de charger ou si les questions sont undefined
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAnswerSubmit = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];

    if (selectedAnswer === null) {
      console.error("No answer selected");
      return;
    }

    if (!user || !user.id) {
      console.error("User is not logged in or user_id is missing");
      return;
    }

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question_id: currentQuestion.id,
        choice_id: selectedAnswer,
      },
    ]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      axiosInstance.post(`/quizzes/${quizId}/submit`, { answers })
        .then(response => {
          console.log('Quiz submitted successfully:', response.data);
          navigate('/results');
        })
        .catch(error => {
          console.error('Error submitting quiz:', error);
        });
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h4>Question: {currentQuestion.content}</h4>
      <Form>
        {currentQuestion.choices.map((choice) => (
          <Form.Check
            key={choice.id}
            type="radio"
            label={choice.content}
            value={choice.id}
            checked={selectedAnswer === choice.id}
            onChange={(e) => setSelectedAnswer(Number(e.target.value))}
          />
        ))}
      </Form>
      <Button variant="primary" className="mt-3" onClick={handleAnswerSubmit}>
        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
      </Button>
    </div>
  );
};

export default TakeQuiz;
