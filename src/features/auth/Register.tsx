import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    matricule: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Vérifiez si les mots de passe correspondent
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordsMatch(formData.password === formData.confirmPassword);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const { confirmPassword, ...userData } = formData;
    dispatch(registerUser(userData)).then(() => {
      navigate('/user-dashboard');
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstname" onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastname" onChange={handleChange} required />
        </div>
        <div>
          <label>Matricule:</label>
          <input type="text" name="matricule" onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required />
        </div>
        {!passwordsMatch && <p>Passwords do not match</p>}
        <div>
          <label>Role:</label>
          <select name="role" onChange={handleChange} required>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading || !passwordsMatch}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
