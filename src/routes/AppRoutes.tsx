import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomeRoute, PublicRoute, ProtectedRoute } from "./types";
import { MainLayout, NotFoundLayout, RegisterLayout, LoginLayout } from "../layouts";
import { NotFoundPage } from "../pages";
import { LoginPage, RegisterPage, AboutPage, ContactPage, FaqPage, PrivacyPolicyPage, TermsOfServicePage, ForgotPasswordPage, ResetPasswordPage } from "../features/public";
import { SettingsPage, StaffActivationPage, StaffRequestPage } from "../features/private";

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