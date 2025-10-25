import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import AddressForm from "./Components/AddressForm";

export default function AddressPage() {
  usePageTitle("Address Edit");

  return (
    <div>
      <AddressForm />
    </div>
  );
}
