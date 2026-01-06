import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";
import AdminLayout from "./components/admin/Layout";
import NotFound from "./pages/NotFound";
import Dashboard from "./admin/Dashboard";
import { CarsListingManager } from "./admin/Cars";
import { ToursListingManager } from "./admin/Tours";
import { BookingsManager } from "./admin/Bookings";
import { InboxManager } from "./admin/Messages";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPasswordConfirm from "./auth/ResetPassword";
import AdminRoute from "./auth/ProtectedRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Homepage />} />
          </Route>

          <Route path="auth" element={<LoginPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="auth/reset-password" element={<ForgotPassword />} />
          <Route
            path="auth/update-password"
            element={<ResetPasswordConfirm />}
          />

          {/* <Route element={<AdminRoute />}> */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<CarsListingManager />} />
            <Route path="tours" element={<ToursListingManager />} />
            <Route path="bookings" element={<BookingsManager />} />
            <Route path="messages" element={<InboxManager />} />
            <Route path="settings" element={<div>Admin Settings</div>} />
          </Route>
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
