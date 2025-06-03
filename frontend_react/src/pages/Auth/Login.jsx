import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {

  if (localStorage.getItem('user')) { return <Navigate to={'/'}/> }
  
  const [form, setForm] = useState({
    credentials : "",
    password: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios.post(`${apiUrl}/auth/login`, form)
      .then((res) => {
        const user = res.data.data
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login gagal!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block mb-1 text-sm">Credentials</label>
            <input
              type="text"
              name="credentials"
              value={form.credentials}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
