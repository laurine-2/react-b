// src/features/quizzes/types.ts

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    matricule: string;
    email: string;
    role: string;
    team_id?: number;
  }
  
  export interface Choice {
    id: number;
    content: string;
    is_correct: boolean;
    question_id: number;
  }
  
  export interface Question {
    id: number;
    content: string;
    quiz_id: number;
    choices: Choice[];
  }
  
  export interface Quiz {
    id: number;
    title: string;
    description?: string;
    category_id: number;
    manager_id?: number;
    questions: Question[];
  }
  
  export type QuizWithoutQuestions = Omit<Quiz, 'id' | 'questions'>;