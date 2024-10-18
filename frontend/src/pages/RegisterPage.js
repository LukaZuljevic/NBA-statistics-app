import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();

    // Send a POST request to register endpoint
    axios
      .post("http://localhost:5000/register", registerValues)
      .then((response) => {
        if (response.data === "Successfully registered") {
          navigate("/login");
        }

        if (response.data === "Email already exists") {
          alert("Email already exists");
        }

        if (response.data === "Passwords do not match") {
          alert("Passwords do not match");
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  return (
    <div className="register-page">
      <div className="register-div">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) =>
              setRegisterValues({ ...registerValues, username: e.target.value })
            }
            type="text"
            id="username"
            name="username"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) =>
              setRegisterValues({ ...registerValues, email: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) =>
              setRegisterValues({ ...registerValues, password: e.target.value })
            }
            type="password"
            id="password"
            name="password"
            required
          />
          <label htmlFor="password2">Confirm Password:</label>
          <input
            onChange={(e) =>
              setRegisterValues({
                ...registerValues,
                password2: e.target.value,
              })
            }
            type="password"
            id="password2"
            name="password2"
            required
          />

          <button className="register-button" type="submit">Register</button>
        </form>

        <a className="login-link" href="/login">
          Already have an account? <strong>Login here</strong>
        </a>
      </div>
    </div>
  );
}

export default RegisterPage;
