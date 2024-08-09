import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from './quizSlice';

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuiz({ title, description, category_id: categoryId }));
    setTitle('');
    setDescription('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Category ID:</label>
        <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </div>
      <button type="submit">Add Quiz</button>
    </form>
  );
};

export default QuizForm;
