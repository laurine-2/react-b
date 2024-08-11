import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizById } from '../quizzers/quizSlice'; // Assurez-vous que cette action est définie pour récupérer un quiz spécifique avec ses questions
import { addUserAnswer } from '../userAnswer/userAnswerSlice'; // Action pour enregistrer la réponse de l'utilisateur
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const TakeQuiz = () => {
  const { quizId } = useParams(); // Récupère l'ID du quiz depuis l'URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.quizzes.selectedQuiz); // Le quiz sélectionné et ses questions
  console.log('Quiz Data:', quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    dispatch(fetchQuizById(quizId)); // Récupère le quiz et ses questions par ID
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz) {
      console.log('Quiz loaded:', quiz); // Debug: Affichez le quiz dans la console
    }
  }, [quiz]);

  const handleAnswerSubmit = () => {
    const question = quiz.questions[currentQuestionIndex];
    dispatch(addUserAnswer({
      user_id: quiz.user_id, // Remplacez par l'ID réel de l'utilisateur
      question_id: question.id,
      answer_id: selectedAnswer,
    }));
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Réinitialise la sélection pour la question suivante
    } else {
      navigate('/results'); // Redirige vers les résultats une fois le quiz terminé
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h2>{quiz.title}</h2>
      <h4>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h4>
      <p>{currentQuestion.content}</p>
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
      <Button variant="primary" className="mt-3" onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
        {currentQuestionIndex < quiz.questions.length - 1 ? 'Suivant' : 'Terminer le Quiz'}
      </Button>
    </div>
  );
};

export default TakeQuiz;
