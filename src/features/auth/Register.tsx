import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { fetchTeams } from '../../features/teams/teamSlice';
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
    team_id: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const teams = useSelector((state: RootState) => state.teams.teams);

  useEffect(() => {
    dispatch(fetchTeams()); // Charger les équipes lors du montage du composant
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  
    // Vérifiez si les mots de passe correspondent en utilisant la valeur actuelle de l'événement
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(
        name === 'password' ? value === formData.confirmPassword : formData.password === value
      );
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
  
    const { confirmPassword, ...userData } = formData;
  
    // Affichez les données envoyées dans la console
    console.log("Sending user data:", userData);
  
    dispatch(registerUser(userData)).then(() => {
      navigate('/login');
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
        
        {/* Sélection de l'équipe */}
        <div>
          <label>Team:</label>
          <select name="team_id" onChange={handleChange} required>
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading || !passwordsMatch}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <h3>Already have an account?</h3>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Register;
