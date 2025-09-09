import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";

import LandingPage from "../features/public/landing/Landing";
import DashboardPage from "../features/private/dashboard/Dashboard";
import AboutPage from "../features/public/about/About";
import LoginPage from "../features/public/auth/pages/LoginPage";
import RegisterPage from "../features/public/auth/pages/RegisterPage";

import NotFoundPage from "../pages/NotFoundPage";

function AppContent() {
    return (
        <Routes>
            {/* Layout utama */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* Layout auth */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Test */}
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