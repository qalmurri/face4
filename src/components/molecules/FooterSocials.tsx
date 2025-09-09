import Icon from "../atoms/Icon";
import Hyperlink from "../atoms/Hyperlink";

export default function FooterSocials() {
    return (
        <div className="flex gap-4">
            <Hyperlink to="https://facebook.com">
                <Icon>facebook</Icon>
            </Hyperlink>
            <Hyperlink to="https://twitter.com">
                <Icon>twitter</Icon>
            </Hyperlink>
            <Hyperlink to="https://instagram.com">
                <Icon>instagram</Icon>
            </Hyperlink>
        </div>
    );
}