import SettingsForm from "./components/SettingsForm";
import { usePageTitle } from "../../../hooks";

export function SettingsPage() {
  usePageTitle("Settings")

  return (
    <div>
      <SettingsForm />
    </div>
  );
}
