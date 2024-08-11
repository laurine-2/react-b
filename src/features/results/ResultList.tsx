import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from './resultSlice';
import { Table } from 'react-bootstrap';

const ResultList = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results); // Récupère les résultats depuis le store
  const status = useSelector((state) => state.results.status); // Statut du chargement
  const error = useSelector((state) => state.results.error); // Erreurs éventuelles

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResults()); // Charge les résultats si le statut est 'idle'
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Affiche un message de chargement si les résultats sont en cours de récupération
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // Affiche un message d'erreur si la récupération des résultats a échoué
  }

  return (
    <div className="container mt-5">
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Quiz ID</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.user_id}</td>
              <td>{result.quiz_id}</td>
              <td>{result.score}</td>
              <td>{new Date(result.created_at).toLocaleDateString()}</td> {/* Formatte la date */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultList;
