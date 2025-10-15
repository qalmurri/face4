import {Hyperlink} from "../../Atoms";

export default function FooterLinks() {
    return (
        <div className="flex flex-col gap-1">
            <Hyperlink to="/about" >About</Hyperlink>
            <Hyperlink to="/contact" >Contact</Hyperlink>
            <Hyperlink to="/privacy" >Privacy Policy</Hyperlink>
            <Hyperlink to="/terms" >Terms of Service</Hyperlink>
        </div>
    );
}