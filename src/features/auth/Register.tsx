import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { fetchTeams } from '../../features/teams/teamSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import logo from "../../assets/image/logo2.jpeg";

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
    <div className="connect">
    <div className="contained signup">
      <h2><img src={logo} alt="" /></h2>
      <form onSubmit={handleSubmit}>
        <div className="element">
          <label>First Name:</label>
          <input
            placeholder="First Name"
            type="text"
            name="firstname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="element">
          <label>Last Name:</label>
          <input
            placeholder="Last Name"
            type="text"
            name="lastname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="element">
          <label>Matricule:</label>
          <input
            placeholder="Matricule"
            type="text"
            name="matricule"
            onChange={handleChange}
            required
          />
        </div>
        <div className="element">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="email"
          />
        </div>
        <div className="element">
          <label>Password:</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="element">
          <label>Confirm Password:</label>
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        {!passwordsMatch && <p>Passwords do not match</p>}
        <div className="element">
          <label>Role:</label>
          <select name="role" onChange={handleChange} required>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading || !passwordsMatch}>
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p>{error}</p>}
      </form>
      <div className="lien">
        <span className="goConnect">
          are you have the acounte!{" "}
          <p onClick={() => navigate("/login")}> Login</p>
        </span>
      </div>
    </div>
  </div>
);
};

export default Register;
