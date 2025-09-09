import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import LoginLayout from "../layouts/LoginLayout";

import LandingPage from "../features/public/landing/Landing";
import DashboardPage from "../features/private/dashboard/Dashboard";
import AboutPage from "../features/public/about/About";
import LoginPage from "../features/public/auth/pages/LoginPage";
import RegisterPage from "../features/public/auth/pages/RegisterPage";

import NotFoundPage from "../pages/NotFoundPage";

function AppContent() {
    return (
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RegisterLayout />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    );
}

export default function AppRoutes() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}