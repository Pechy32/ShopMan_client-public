import { useState, useEffect } from "react";
import { registerUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email.includes("@")) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registerUser({
      name,
      email,
      passwordHash: password,
    });

    if (res.error) {
      setError(res.error);
      return;
    }

    alert("registration was successful");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form className="card p-4 shadow" style={{ width: "350px" }} onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className={`form-control mb-2 ${emailValid ? "" : "is-invalid"}`}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {!emailValid && <div className="invalid-feedback">Email is not valid</div>}

        <input
          className="form-control mb-3"
          placeholder="Heslo"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100" disabled={!emailValid}>
          Registrovat
        </button>

        <button
        type="button"
          className="btn btn-link mt-3 w-100"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default RegisterView;
