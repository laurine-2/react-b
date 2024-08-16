import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizById } from './quizSlice';
import { addUserAnswer } from '../userAnswer/userAnswerSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const TakeQuiz = () => {
  const { quizId } = useParams(); // Récupère l'ID du quiz depuis l'URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.quizzes.selectedQuiz); // Récupère les questions du quiz sous forme de tableau
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Réponse sélectionnée

  useEffect(() => {
    dispatch(fetchQuizById(quizId)); // Charge les questions du quiz sélectionné
  }, [dispatch, quizId]);

  // Vérifiez que le quiz est bien un tableau et qu'il a des questions
  if (!quiz || quiz.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAnswerSubmit = () => {
    const currentQuestion = quiz[currentQuestionIndex]; // Prend la question actuelle
    
    if (!selectedAnswer) {
      console.error("No answer selected");
      return;
    }

    dispatch(addUserAnswer({
      user_id: quiz.user_id, // Assurez-vous que user_id est défini quelque part
      question_id: currentQuestion.id,
      answer_id: selectedAnswer,
    }));

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      navigate('/results'); // Redirige vers la page des résultats
    }
  };

  const currentQuestion = quiz[currentQuestionIndex]; // Récupère la question actuelle

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
        Suivant
      </Button>
    </div>
  );
};

export default TakeQuiz;
