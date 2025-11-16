import { People } from "react-bootstrap-icons";

function MemberSwitch({ size, style, onClick }) {
  return (
    <People size={size} style={style} onClick={onClick} />
  );
}

export default MemberSwitch;
