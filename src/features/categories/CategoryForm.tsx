import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from './categorySlice';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CategoryForm = () => {
  const [show, setShow] = useState(false);
  const [viewMode, setViewMode] = useState(false); // Pour savoir si on est en mode "Voir" ou "Éditer"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
    setSelectedCategory(null);
    setViewMode(false);
  };

  const handleShow = () => setShow(true);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setName('');
    setDescription('');
    setViewMode(false);
    handleShow();
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    setViewMode(false);
    handleShow();
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    setViewMode(true);
    handleShow();
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      dispatch(updateCategory({ id: selectedCategory.id, name, description }));
    } else {
      dispatch(addCategory({ name, description }));
    }
    handleClose();
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={handleAddCategory}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{viewMode ? 'View Category' : selectedCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={viewMode} // Désactiver en mode "Voir"
              />
            </Form.Group>

            <Form.Group controlId="formCategoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={viewMode} // Désactiver en mode "Voir"
              />
            </Form.Group>

            {!viewMode && ( // Cacher le bouton "Save Changes" en mode "Voir"
              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(categories) && categories.map((category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>
        <Button variant="info" className="me-2" onClick={() => handleViewCategory(category)}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Button variant="warning" className="me-2" onClick={() => handleEditCategory(category)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
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

export default CategoryForm;
