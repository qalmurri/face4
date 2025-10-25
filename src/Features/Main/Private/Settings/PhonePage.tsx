import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import PhoneForm from "./Components/PhoneForm";

export default function PhonePage() {
  usePageTitle("Phone Edit")

  return (
    <div>
      <PhoneForm />
    </div>
  );
}
