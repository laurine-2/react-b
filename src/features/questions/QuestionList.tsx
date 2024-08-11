import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, deleteQuestion } from './questionSlice';
import { Table, Button } from 'react-bootstrap';
import QuestionForm from './QuestionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const QuestionList = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const status = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  const handleShowModal = (question = null) => {
    setCurrentQuestion(question);
    setEditMode(!!question);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add Question
      </Button>

      <QuestionForm show={showModal} handleClose={handleCloseModal} editMode={editMode} existingQuestion={currentQuestion} />

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Quiz ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.content}</td>
              <td>{question.quiz_id}</td>
              <td>
                <Button variant="info" className="me-2">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(question)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" onClick={() => dispatch(deleteQuestion(question.id))}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default QuestionList;
