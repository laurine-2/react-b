import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizById } from './quizSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axios'; // Importez votre instance axios

const TakeQuiz = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const quiz = useSelector((state) => state.quizzes.selectedQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]); // Stocke toutes les réponses

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch, quizId]);

  if (!quiz || quiz.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAnswerSubmit = () => {
    const currentQuestion = quiz[currentQuestionIndex];

    if (!selectedAnswer) {
      console.error("No answer selected");
      return;
    }

    if (!user || !user.id) {
      console.error("User is not logged in or user_id is missing");
      return;
    }

    // Ajoutez la réponse à la liste des réponses
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question_id: currentQuestion.id,
        choice_id: selectedAnswer,
      },
    ]);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Soumettez toutes les réponses à la fin du quiz
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

  const currentQuestion = quiz[currentQuestionIndex];

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
        {currentQuestionIndex < quiz.length - 1 ? 'Suivant' : 'Soumettre'}
      </Button>
    </div>
  );
};

export default TakeQuiz;
