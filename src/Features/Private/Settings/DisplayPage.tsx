import usePageTitle from "../../../Hooks/UsePageTitleHook";
import DisplayForm from "./Components/DisplayForm";

export default function DisplayPage() {
  usePageTitle("Display Edit")

  return (
    <div>
      <DisplayForm/>
    </div>
  );
}
