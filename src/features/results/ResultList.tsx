import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchResults } from "./resultSlice";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";

const ResultList = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results); // Récupère les résultats depuis Redux
  const status = useSelector((state) => state.results.status); // Statut du chargement
  const error = useSelector((state) => state.results.error); // Erreurs éventuelles

  // useEffect(() => {
  //   dispatch(fetchResults());
  // }, [dispatch]);

  console.log("Results:", results);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="dashboard">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id}>
              <p>
                Quiz: {result.quiz.title}, Score: {result.score}%
              </p>
            </div>
          ))
        ) : (
          <p>Pas de résultats disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ResultList;
