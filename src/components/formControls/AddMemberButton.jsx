import { PersonPlus } from "react-bootstrap-icons";

function AddMemberButton({ onClick }) {
  return (
    <button variant="light" className="btn btn-outline-dark" onClick={onClick}>
      <PersonPlus size={18} style={{ marginRight: "6px", marginBottom: "2px" }} />
      Add Member
    </button>
  );
}

export default AddMemberButton;
