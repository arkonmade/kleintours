import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Binoculars,
  LayoutPanelLeft,
  Mail,
  Settings,
  Tickets,
} from "lucide-react";
import CircleLoaders from "../Loader";
import { IoCarSportOutline } from "react-icons/io5";
// import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  //   const { isAdmin, loading } = useAuth();
  const location = useLocation();

  //   if (loading) {
  //     return (
  //       <>
  //         <CircleLoaders />
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="min-h-screen bg-[#f5f7fa] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage car & tour listings and users
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <nav className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <LayoutPanelLeft className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </NavLink>

                <NavLink
                  to="/admin/cars"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <IoCarSportOutline className="h-5 w-5" />
                  <span className="font-medium">Cars</span>
                </NavLink>

                <NavLink
                  to="/admin/tours"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <Binoculars className="h-5 w-5" />
                  <span className="font-medium">Tours</span>
                </NavLink>

                <NavLink
                  to="/admin/bookings"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <Tickets className="h-5 w-5" />
                  <span className="font-medium">Bookings</span>
                </NavLink>

                <NavLink
                  to="/admin/messages"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Messages</span>
                </NavLink>

                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#c9a240] text-white"
                        : "text-gray-700 hover:bg-[#e4e2dc]"
                    }`
                  }
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </NavLink>
              </div>
            </nav>

            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
