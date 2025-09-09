import Button from "../../atoms/Button";
import Hyperlink from "../../atoms/Hyperlink";
import DropdownMenu from "../Dropdown";

export default function Public() {
    return (
        <>
            <Hyperlink variant="primary" to="/">Home</Hyperlink>
            <Hyperlink variant="secondary" to="/dashboard">Dashboard</Hyperlink>
            <DropdownMenu
                trigger={<span className="cursor-pointer px-3 py-2">About ▾</span>}
                items={[
                    { label: "Company", to: "/about/company" },
                    { label: "Team", to: "/about/team" },
                    { label: "Careers", to: "/about/careers" },
                ]}
            />
            <Button variant="danger" to="/login">Login</Button>
            <Button variant="danger" to="/register">Register</Button>
        </>
    );
}