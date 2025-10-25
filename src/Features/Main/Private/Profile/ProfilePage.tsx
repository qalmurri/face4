import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import ProfileForm from "./Components/ProfileForm";

export default function ProfilePage() {
  usePageTitle("Profile")

  return (
    <div>
      <ProfileForm />
    </div>
  );
}
