import usePageTitle from "../../../Hooks/UsePageTitleHook";
import PreferenceForm from "./Components/PreferenceForm";

export default function PreferencePage() {
  usePageTitle("Preference Edit")

  return (
    <div>
      <PreferenceForm/>
    </div>
  );
}
