// src/features/users/UserList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from './userSlice';
import { RootState, AppDispatch } from '../../store';
import { Table, Button, Form } from 'react-bootstrap';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      dispatch(updateUser({ ...user, role: newRole }));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname} {user.lastname}</td>
            <td>{user.email}</td>
            <td>
              <Form.Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
