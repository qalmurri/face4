import usePageTitle from "../../../Hooks/UsePageTitleHook";
import Phone from "./Components/Phone";

export default function PhonePage() {
  usePageTitle("Phone Edit")

  return (
    <div>
      <Phone />
    </div>
  );
}
