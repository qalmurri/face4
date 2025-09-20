import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContext";

import Button from "../../../atoms/buttons/GeneralButton";
import Hyperlink from "../../../atoms/links/Hyperlink";
import DropdownMenu from "../Dropdown";

export default function Public() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
      <Button variant="danger" leftIcon={<FaPlus />} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
