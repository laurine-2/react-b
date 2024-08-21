import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import logo from "../../assets/image/logo2.jpeg";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    matricule: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Vérifiez si les mots de passe correspondent
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
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
      navigate("/user-dashboard");
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
