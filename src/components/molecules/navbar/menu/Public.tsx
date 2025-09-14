import Button from "../../../atoms/buttons/GeneralButton";
import Hyperlink from "../../../atoms/links/Hyperlink";
import DropdownMenu from "../Dropdown";
import { FaPlus, FaArrowRight } from "react-icons/fa";

export default function Public() {
    return (
      <>
        <Hyperlink variant="primary" to="/">Home</Hyperlink>
         <Hyperlink variant="primary" to="/about">
          About
        </Hyperlink>
        <Hyperlink variant="primary" to="/contact">
          Contact
        </Hyperlink>
        <Hyperlink variant="primary" to="/faq">
          faq
        </Hyperlink>
        <Hyperlink variant="primary" to="/privacy">
          Privacy
        </Hyperlink>
        <Hyperlink variant="primary" to="/tos">
          tos
        </Hyperlink>
        <DropdownMenu
          trigger={<span className="cursor-pointer px-3 py-2">About ▾</span>}
          items={[
            { label: "Company", to: "/about/company" },
            { label: "Team", to: "/about/team" },
            { label: "Careers", to: "/about/careers" },
          ]}
        />
        <Button variant="danger" leftIcon={<FaPlus />} to="/login">
          Login
        </Button>
        <Button variant="danger" size="sm" leftIcon={<FaArrowRight />}  to="/register">
          Register
        </Button>
      </>
    );
}