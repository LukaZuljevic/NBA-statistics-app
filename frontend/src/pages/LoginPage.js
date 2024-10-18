import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", registerValues)
      .then((response) => {
        const { accessToken } = response.data;

        if (accessToken) {
          // Store the token in local storage
          localStorage.setItem("accessToken", accessToken);
          navigate("/");
        } else {
          alert("Error loggin in");
        }
        console.log("Response from register:", response);
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-div">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
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
          <button className="login-button" type="submit">Login</button>
        </form>

        <a className="register-link" href="/register">
          You don't have an account? <strong>Register here</strong>
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
