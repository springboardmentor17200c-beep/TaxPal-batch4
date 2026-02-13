import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { setToken } from "../utils/auth";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ SENDS: POST http://localhost:5000/api/auth/register  
      // ✅ BODY: { name, email, password }
      const response = await apiClient.post("/auth/register", formData);
      
      // ✅ Backend returns: { token: "jwt...", user: {...} }
      setToken(response.data.token); // Auto-login
      navigate("/dashboard");
    } catch (err) {
      // ✅ Backend errors: { message: "Email already exists" }
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">
      <div className="text-center mb-10">
        <h1 className="auth-title">TaxPal</h1>
        <p className="auth-subtitle">Create your account</p>
      </div>

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
            placeholder="username"
            required
          />
        </div>

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
            minLength={6}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-600 text-lg">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Register;
