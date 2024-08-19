import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAnswers } from './userAnswerSlice';
import { Table } from 'react-bootstrap';

const UserAnswerList = () => {
  const dispatch = useDispatch();
  const userAnswers = useSelector((state) => state.userAnswers.userAnswers); // Récupère les réponses utilisateur depuis le store
  const status = useSelector((state) => state.userAnswers.status); // Statut du chargement
  const error = useSelector((state) => state.userAnswers.error); // Erreurs éventuelles

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserAnswers()); // Charge les réponses utilisateur si le statut est 'idle'
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Affiche un message de chargement si les réponses utilisateur sont en cours de récupération
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // Affiche un message d'erreur si la récupération des réponses a échoué
  }

  return (
    <div className="container mt-5">
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Question ID</th>
            <th>Choice ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userAnswers.map((userAnswer) => (
            <tr key={userAnswer.id}>
              <td>{userAnswer.id}</td>
              <td>{userAnswer.user_id}</td>
              <td>{userAnswer.question_id}</td>
              <td>{userAnswer.choice_id}</td>
              <td>{new Date(userAnswer.created_at).toLocaleDateString()}</td> {/* Formatte la date */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserAnswerList;
