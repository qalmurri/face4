import { Routes, Route } from "react-router-dom";
import HomeRoute from "./Types/HomeRoute";
import PublicRoute from "./Types/PublicRoute";
import MainLayout from "../Layouts/MainLayout";
import RegisterLayout from "../Layouts/Auth/RegisterLayout";
import LoginLayout from "../Layouts/Auth/LoginLayout";
import StaffActivationPage from "../Features/Main/Public/Activation/StaffActivationPage";
import LoginPage from "../Features/Main/Public/Auth/Login/LoginPage";
import RegisterPage from "../Features/Main/Public/Auth/Register/RegisterPage";
import AboutPage from "../Features/Main/Public/GeneralInfo/About/AboutPage";
import ContactPage from "../Features/Main/Public/GeneralInfo/Contact/ContactPage";
import FaqPage from "../Features/Main/Public/GeneralInfo/FAQ/FaqPage";
import PrivacyPolicyPage from "../Features/Main/Public/GeneralInfo/PrivacyPolicy/PrivacyPolicyPage";
import TermsOfServicePage from "../Features/Main/Public/GeneralInfo/TermsOfService/TermsOfServicePage";
import ForgotPasswordPage from "../Features/Main/Public/Auth/Password/ForgotPasswordPage";
import ResetPasswordPage from "../Features/Main/Public/Auth/Password/ResetPasswordPage";

function PublicContent() {
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

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/tos" element={<TermsOfServicePage />} />
        <Route path="/activate-staff/:uid/:token" element={<StaffActivationPage />} />
      </Route>
    </Routes>
  );
}

export default function PublicRoutes() {
  return (

    <PublicContent />

  )
}