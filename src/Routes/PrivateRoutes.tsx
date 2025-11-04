import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Types/ProtectedRoute";
import MainLayout from "../Layouts/MainLayout";
import AccountsPage from "../Features/Main/Private/Settings/AccountPage";
import PhonePage from "../Features/Main/Private/Settings/PhonePage";
import AddressPage from "../Features/Main/Private/Settings/AddressPage";
import DisplayPage from "../Features/Main/Private/Settings/DisplayPage";
import PreferencePage from "../Features/Main/Private/Settings/PreferencePage";
import StaffRequestPage from "../Features/Main/Private/Activation/StaffRequestPage";

function PrivateContent() {
    return (
        <Routes>
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
        </Routes>
    );
}

export default function PrivateRoutes() {
    return (

        <PrivateContent />

    )
}