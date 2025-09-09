import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import LoginLayout from "../layouts/LoginLayout";

import LoginPage from "../features/public/auth/login/LoginPage";
import RegisterPage from "../features/public/auth/register/RegisterPage";

import LandingPage from "../features/public/landing/Landing";
import DashboardPage from "../features/private/dashboard/Dashboard";

import AboutPage from "../features/public/gi/about/About";
import Contact from "../features/public/gi/contact/Contact";
import Faq from "../features/public/gi/faq/Faq";
import PrivacyPolicy from "../features/public/gi/pp/PrivacyPolicy";
import TermsOfService from "../features/public/gi/tos/TermsOfService";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tos" element={<TermsOfService />} />
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