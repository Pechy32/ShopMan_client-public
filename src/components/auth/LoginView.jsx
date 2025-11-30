import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";

function LoginView() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);
    if (!user) {
      setError("Wrong email or password");
      return;
    }

    navigate("/dashboard");
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <form className="card p-4 shadow" onSubmit={handleSubmit} style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" disabled={!emailValid}>
          Login
        </button>

        <button
          className="btn btn-link mt-3 w-100"
          onClick={() => navigate("/register")}
        >
          Doesn't have an account? Register
        </button>
      </form>
    </div>
  );
}

export default LoginView;
