import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/categories/categorySlice';
import quizReducer from '../features/quizzers/quizSlice';
import questionReducer from '../features/questions/questionSlice';
import resultReducer from '../features/results/resultSlice';
import userAnswerReducer from '../features/userAnswer/userAnswerSlice';
import teamReducer from '../features/teams/teamSlice';
import userReducer  from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    quizzes: quizReducer,
    questions: questionReducer,
    results: resultReducer,
    userAnswer: userAnswerReducer,
    teams: teamReducer,
    users: userReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
