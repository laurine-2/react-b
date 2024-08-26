import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Login.css';
import logo from "../../assets/image/logo2.jpeg";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Use a stable value or check if user exists before navigating
  useEffect(() => {
    if (user && user.role) {
      switch (user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'manager':
          navigate('/manager-dashboard');
          break;
        default:
          navigate('/user-dashboard');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="global">
      <div className="contained">
        <h2>
          <img src={logo} alt="" />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="element">
            <label>Email:</label>
            <input
              placeholder="Entrer vote email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="element">
            <label>Password:</label>
            <input
              placeholder="Entrer votre mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p>{error.message}</p>}
        </form>
        <div className="info">
          <span>Mot de passe oublié ? </span>
        </div>

        <div className="lien">
          <span className="goConnect">
            Vous n'avez pas encore de compte?
            <p onClick={() => navigate("/register")}> SignUp</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
