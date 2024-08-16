import React from 'react';
import { useSelector } from 'react-redux';

const ResultPage = () => {
  const results = useSelector((state) => state.results.results); // Récupère les résultats
  const user = useSelector((state) => state.auth.user); // Récupère l'utilisateur connecté

  const userResult = results.find(result => result.user_id === user.id); // Récupère le résultat de l'utilisateur

  return (
    <div className="container mt-5">
      <h2>Résultat du Quiz</h2>
      {userResult ? (
        <div>
          <p>Score: {userResult.score}%</p>
          <p>Félicitations! Vous avez terminé le quiz.</p>
        </div>
      ) : (
        <p>Pas de résultats disponibles.</p>
      )}
    </div>
  );
};

export default ResultPage;
