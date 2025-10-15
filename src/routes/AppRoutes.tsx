import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoute from "./Types/HomeRoute";
import PublicRoute from "./Types/PublicRoute";
import ProtectedRoute from "./Types/ProtectedRoute";
import MainLayout  from "../Layouts/MainLayout";
import NotFoundLayout from "../Layouts/Error/NotFoundLayout";
import RegisterLayout from "../Layouts/Auth/RegisterLayout";
import LoginLayout  from "../Layouts/Auth/LoginLayout";
import NotFoundPage from "../Pages/NotFoundPage";
import StaffActivationPage from "../Features/Public/Activation/StaffActivationPage";
import LoginPage from "../Features/Public/Auth/login/LoginPage";
import RegisterPage from "../Features/Public/Auth/register/RegisterPage";
import AboutPage from "../Features/Public/GeneralInfo/About/AboutPage";
import ContactPage from "../Features/Public/GeneralInfo/Contact/ContactPage";
import FaqPage from "../Features/Public/GeneralInfo/FAQ/FaqPage";
import PrivacyPolicyPage from "../Features/Public/GeneralInfo/PrivacyPolicy/PrivacyPolicyPage";
import TermsOfServicePage from "../Features/Public/GeneralInfo/TermsOfService/TermsOfServicePage";
import ForgotPasswordPage from "../Features/Public/Auth/password/ForgotPasswordPage";
import ResetPasswordPage from "../Features/Public/Auth/password/ResetPasswordPage";
import SettingsPage from "../Features/Private/Settings/SettingsPage";
import StaffRequestPage from "../Features/Private/Activation/StaffRequestPage";


function AppContent() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset/:uid/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<RegisterLayout />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/request-staff" element={<StaffRequestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/tos" element={<TermsOfServicePage />} />
        <Route path="/activate-staff/:uid/:token" element={<StaffActivationPage />} />
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