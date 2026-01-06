import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Get the current user session from Supabase
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Get user role from profiles table
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle(); // maybeSingle avoids errors if no row exists

        if (profileError) throw profileError;

        setIsAdmin(data?.role === "admin");
      } catch (err) {
        console.error("Admin check failed:", err.message);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/unauthorized" replace />;

  return <Outlet />; // render the admin page
};

export default AdminRoute;
