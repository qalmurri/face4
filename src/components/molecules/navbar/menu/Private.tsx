import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuthStatus } from "../../../../Contexts/StatusContext";

import { GeneralButton, Hyperlink } from "../../../Atoms";
import DropdownMenu from "../Dropdown";

export default function Public() {
  const { logout } = useAuthStatus();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Hyperlink variant="primary" to="/">
        Home
      </Hyperlink>
      <Hyperlink variant="primary" to="/about">
        About
      </Hyperlink>
      <DropdownMenu
        trigger={<span className="cursor-pointer px-3 py-2">About ▾</span>}
        items={[
          { label: "Company", to: "/about/company" },
          { label: "Team", to: "/about/team" },
          { label: "Careers", to: "/about/careers" },
        ]}
      />
      <GeneralButton
        variant="danger"
        leftIcon={<FaPlus />}
        onClick={handleLogout}>
        Logout
      </GeneralButton>
    </>
  );
}
