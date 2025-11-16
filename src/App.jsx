import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import NavbarHeader from "./components/app/NavbarHeader";
import DashboardView from "./components/dashboard/DashboardView";
import ListDetailView from "./components/dashboard/ListDetailView";

import LoginView from "./components/auth/LoginView";
import RegisterView from "./components/auth/RegisterView";
import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  return (
    <Router>
      <NavbarHeader />

      <div className="container mt-3">
        <Routes>

          {/* ----- AUTH ----- */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />

          {/* ----- ROOT redirect ----- */}
          <Route index element={<Navigate to="/dashboard" />} />

          {/* ----- PROTECTED ROUTES ----- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <ListDetailView />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
