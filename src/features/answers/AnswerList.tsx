// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAnswers, deleteAnswer } from './answerSlice';
// import { Table, Button } from 'react-bootstrap';
// import AnswerForm from './AnswerForm';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// const AnswerList = () => {
//   const dispatch = useDispatch();
//   const answers = useSelector((state) => state.answers.answers);
//   const status = useSelector((state) => state.answers.status);
//   const error = useSelector((state) => state.answers.error);

//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentAnswer, setCurrentAnswer] = useState(null);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchAnswers());
//     }
//   }, [status, dispatch]);

//   const handleShowModal = (answer = null) => {
//     setCurrentAnswer(answer);
//     setEditMode(!!answer);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <Button variant="primary" onClick={() => handleShowModal()}>
//         Add Answer
//       </Button>

//       <AnswerForm show={showModal} handleClose={handleCloseModal} editMode={editMode} existingAnswer={currentAnswer} />

//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Content</th>
//             <th>Is Correct</th>
//             <th>Question ID</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {answers.map((answer) => (
//             <tr key={answer.id}>
//               <td>{answer.id}</td>
//               <td>{answer.content}</td>
//               <td>{answer.is_correct ? 'Yes' : 'No'}</td>
//               <td>{answer.question_id}</td>
//               <td>
//                 <Button variant="info" className="me-2">
//                   <FontAwesomeIcon icon={faEye} />
//                 </Button>
//                 <Button variant="warning" className="me-2" onClick={() => handleShowModal(answer)}>
//                   <FontAwesomeIcon icon={faEdit} />
//                 </Button>
//                 <Button variant="danger" onClick={() => dispatch(deleteAnswer(answer.id))}>
//                   <FontAwesomeIcon icon={faTrash} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default AnswerList;
