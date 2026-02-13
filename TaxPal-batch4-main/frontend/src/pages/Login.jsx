import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { setToken } from "../utils/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ SENDS: POST http://localhost:5000/api/auth/login
      // ✅ BODY: { email, password }
      const response = await apiClient.post("/auth/login", formData);
      
      // ✅ Backend returns: { token: "jwt...", user: {...} }
      setToken(response.data.token); // Save to localStorage via auth.js
      navigate("/dashboard");
    } catch (err) {
      // ✅ Backend errors: { message: "Invalid credentials" }
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="auth-page">
    <div className="auth-card">
      <div className="text-center mb-10">
        <h1 className="auth-title">TaxPal</h1>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-input"
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="form-input"
            placeholder=""
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-600 text-lg">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one now →
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
