import { ChevronLeftIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (signUpError) throw signUpError;

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (loginError) throw loginError;

      const currentUser = loginData.user;
      if (!currentUser) throw new Error("Authentication failed");

      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: currentUser.id,
          full_name: formData.fullName,
          email: formData.email,
        },
      ]);
      if (insertError) throw insertError;

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md py-10 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-4" /> Back to dashboard
        </button>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-6">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500">
              Create your account to get started!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="fullName"
              type="text"
              className={inputBase}
              placeholder="Fullname"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              className={inputBase}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={inputBase}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-white"
              >
                {showPassword ? (
                  <EyeIcon className="size-5 text-gray-500" />
                ) : (
                  <EyeClosedIcon className="size-5 text-gray-500" />
                )}
              </button>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
                required
              />
              <span>
                I agree to the{" "}
                <span className="font-medium text-gray-800">Terms & Conditions</span>{" "}
                and{" "}
                <span className="font-medium text-gray-800">Privacy Policy</span>
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#2b2b2b] flex justify-center px-4 py-3 text-sm font-medium text-white hover:bg-[#c9a240]"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-brand-500 hover:text-brand-600"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
