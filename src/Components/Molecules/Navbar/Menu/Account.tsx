import { Hyperlink } from "../../../../Components/Atoms";

export default function AccountMenuNavbar() {
  return (
    <div>
        <Hyperlink to="/account/edit">edit profile</Hyperlink>
        <Hyperlink to="/account/phone">phone profile</Hyperlink>
        <Hyperlink to="/account/preference">preference profile</Hyperlink>
        <Hyperlink to="/account/address">address profile</Hyperlink>
        <Hyperlink to="/account/display">display profile</Hyperlink>
    </div>
  );
}
