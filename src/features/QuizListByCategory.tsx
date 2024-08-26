import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzesByCategory } from "../features/quizzers/quizSlice";
import { useParams, Link } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";

const QuizListByCategory = () => {
  const { categoryId } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const status = useSelector((state) => state.quizzes.status);
  const error = useSelector((state) => state.quizzes.error);

  useEffect(() => {
    dispatch(fetchQuizzesByCategory(categoryId));
  }, [dispatch, categoryId]);

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
        <h2>Quizzes in Category</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}/questions`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizListByCategory;
