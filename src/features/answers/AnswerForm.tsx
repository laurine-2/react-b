// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addAnswer, updateAnswer } from './answerSlice';
// import { Button, Modal, Form } from 'react-bootstrap';

// const AnswerForm = ({ show, handleClose, editMode = false, existingAnswer = null }) => {
//   const [content, setContent] = useState(existingAnswer ? existingAnswer.content : '');
//   const [isCorrect, setIsCorrect] = useState(existingAnswer ? existingAnswer.is_correct : false);
//   const [questionId, setQuestionId] = useState(existingAnswer ? existingAnswer.question_id : '');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const answerData = { content, is_correct: isCorrect, question_id: questionId };
//     if (editMode) {
//       dispatch(updateAnswer({ id: existingAnswer.id, answerData }));
//     } else {
//       dispatch(addAnswer(answerData));
//     }
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{editMode ? 'Edit' : 'Add'} Answer</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formAnswerContent">
//             <Form.Label>Answer Content</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter answer content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formIsCorrect" className="mt-3">
//             <Form.Check
//               type="checkbox"
//               label="Is Correct?"
//               checked={isCorrect}
//               onChange={(e) => setIsCorrect(e.target.checked)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formQuestionId" className="mt-3">
//             <Form.Label>Question ID</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter question ID"
//               value={questionId}
//               onChange={(e) => setQuestionId(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" className="mt-3">
//             Save Changes
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AnswerForm;
