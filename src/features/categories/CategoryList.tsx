import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categorySlice";
import { fetchQuizzesByCategory } from "../quizzers/quizSlice"; // Importez l'action pour récupérer les quiz par catégorie
import { Link } from "react-router-dom";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const status = useSelector((state) => state.categories.status);
  const quizStatus = useSelector((state) => state.quizzes.status);
  const error = useSelector((state) => state.categories.error);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    dispatch(fetchQuizzesByCategory(categoryId)); // Récupérez les quiz pour la catégorie sélectionnée
  };

  if (status === "loading" || quizStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || quizStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="dashboard">
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/categories/${category.id}/quizzes`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        {selectedCategory && (
          <div>
            <h3>
              Quizzes in{" "}
              {categories.find((cat) => cat.id === selectedCategory).name}
            </h3>
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.id}>
                  <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>{" "}
                  {/* Lien pour démarrer le quiz */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
