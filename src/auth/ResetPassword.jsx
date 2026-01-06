import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ResetPasswordConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("access_token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
        // Supabase automatically picks up the access token from the URL
      });

      if (error) throw error;
      setMessage("Password updated successfully! You can now log in.");
      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <p className="text-center mt-10">Invalid or missing token.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-lg font-semibold mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
