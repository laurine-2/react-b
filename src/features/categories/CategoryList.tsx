import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store'; // Import des types RootState et AppDispatch
import { fetchCategories } from './categorySlice';
import { fetchQuizzesByCategory } from '../quizzers/quizSlice';
import { Link } from 'react-router-dom';

// Définition des interfaces pour les catégories et les quiz
interface Category {
  id: number;
  name: string;
  description: string;
  team_id: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  category_id: number;
}

const CategoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typage du dispatch
  const categories = useSelector((state: RootState) => state.categories.categories) as Category[];
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes) as Quiz[];
  const status = useSelector((state: RootState) => state.categories.status);
  const quizStatus = useSelector((state: RootState) => state.quizzes.status);
  const error = useSelector((state: RootState) => state.categories.error);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Typage de l'état pour `selectedCategory`

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    dispatch(fetchQuizzesByCategory(categoryId)); // Récupération des quiz pour la catégorie sélectionnée
  };

  if (status === 'loading' || quizStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || quizStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}/quizzes`} onClick={() => handleCategoryClick(category.id)}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <div>
          <h3>
            Quizzes in {categories.find((cat) => cat.id === selectedCategory)?.name}
          </h3>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link> {/* Lien pour démarrer le quiz */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
