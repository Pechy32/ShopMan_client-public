import AddMemberButton from "../formControls/AddMemberButton";

function MemberControlPanel({ onAddMemberClick }) {
  return (
    <div className="d-flex align-items-center justify-content-end p-3 bg-light">
      <AddMemberButton onClick={onAddMemberClick} />
    </div>
  );
}

export default MemberControlPanel;
