import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "./quizSlice";
import { fetchCategories } from "../categories/categorySlice"; // Importez votre slice des catégories
import { Button, Modal, Form } from "react-bootstrap";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";

const QuizForm: React.FC<QuizFormProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuiz({ title, description, category_id: categoryId }));
    setTitle("");
    setDescription("");
    setCategoryId("");
    handleClose();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="dashboard">
        <span onClick={handleShow}>Add quizz</span>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add/Edit Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formQuizTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quiz title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQuizDescription" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quiz description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCategoryId" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories?.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
