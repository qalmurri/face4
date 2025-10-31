import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoute from "./Types/HomeRoute";
import PublicRoute from "./Types/PublicRoute";
import ProtectedRoute from "./Types/ProtectedRoute";
import MainLayout from "../Layouts/MainLayout";
import NotFoundLayout from "../Layouts/Error/NotFoundLayout";
import RegisterLayout from "../Layouts/Auth/RegisterLayout";
import LoginLayout from "../Layouts/Auth/LoginLayout";
import NotFoundPage from "../Pages/NotFoundPage";
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
import AccountsPage from "../Features/Main/Private/Settings/AccountPage";
import PhonePage from "../Features/Main/Private/Settings/PhonePage";
import AddressPage from "../Features/Main/Private/Settings/AddressPage";
import DisplayPage from "../Features/Main/Private/Settings/DisplayPage";
import PreferencePage from "../Features/Main/Private/Settings/PreferencePage";
import StaffRequestPage from "../Features/Main/Private/Activation/StaffRequestPage";

function MainContent() {
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

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/request-staff" element={<StaffRequestPage />} />
          <Route path="/account/edit" element={<AccountsPage />} />
          <Route path="/account/phone" element={<PhonePage />} />
          <Route path="/account/address" element={<AddressPage />} />
          <Route path="/account/display" element={<DisplayPage />} />
          <Route path="/account/preference" element={<PreferencePage />} />
        </Route>
      </Route>

      <Route element={<NotFoundLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function MainRoutes() {
  return (
    <Router>
      <MainContent />
    </Router>
  )
}