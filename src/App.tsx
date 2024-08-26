import React from "react";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Logout from "./features/auth/Logout";
import UserDashboard from "./component/UserDashboard";
import ManagerDashboard from "./component/ManagerDashboard";
import AdminDashboard from "./component/AdminDashboard";
import PrivateRoute from "./component/PrivateRoute";
import CategoryForm from "./features/categories/CategoryForm";
import CategoryList from "./features/categories/CategoryList";
import QuizForm from "./features/quizzers/QuizForm";
import QuizList from "./features/quizzers/QuizList";
import QuestionList from "./features/questions/QuestionList";
import ResultList from "./features/results/ResultList";
import Profil from "./component/Profil";
import TakeQuiz from "./features/quizzers/TakeQuiz";
import QuizListByCategory from "./features/QuizListByCategory";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<PrivateRoute />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profil" element={<Profil />} />
        {/* Manager Routes */}
        <Route path="/create-category" element={<CategoryForm />} />
        <Route path="/edit-category" element={<CategoryList />} />
        <Route path="/delete-category" element={<CategoryList />} />
        <Route path="/quizzes/create" element={<QuizForm />} />
        <Route path="/quizzes/list" element={<QuizList />} />
        <Route path="/question" element={<QuestionList />} />
        <Route path="/result" element={<ResultList />} />

        {/* user */}
        <Route path="/categories" element={<CategoryList />} />
        <Route
          path="/categories/:categoryId/quizzes"
          element={<QuizListByCategory />}
        />
        <Route path="/quizzes/:quizId" element={<TakeQuiz />} />
        <Route path="/quizzes" element={<QuizListByCategory />} />
        <Route path="/quizzes/:quizId/questions" element={<TakeQuiz />} />
        <Route path="/results" element={<ResultList />} />
      </Route>
    </Routes>
  );
};

export default App;
