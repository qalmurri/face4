import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomeRoute, PublicRoute } from "./type";
import { MainLayout, NotFoundLayout, RegisterLayout, LoginLayout } from "../layouts";
import { NotFoundPage } from "../pages";
import { LoginPage, RegisterPage, About, Contact, Faq, PrivacyPolicy, TermsOfService } from "../features/public";

function AppContent() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RegisterLayout />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<About />} />
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