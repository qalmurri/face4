import StaffActivationConfirm from "./Components/StaffActivationForm";
import usePageTitle from "../../../../Hooks/UsePageTitleHook";

export default function StaffActivationPage() {
  usePageTitle("Staff Request");

  return (
    <div>
      <StaffActivationConfirm />
    </div>
  );
}
