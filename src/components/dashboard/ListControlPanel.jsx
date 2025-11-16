import Archive from "../formControls/ArchiveListButton";
import Delete from "../formControls/DeleteButton";
import Edit from "../formControls/EditButton";

function ListControlPanel({ onArchive, onDelete, onEdit }) {
  return (
    <>
      <Delete
        style={{ marginRight: "10px", cursor: "pointer" }}
        size={"22px"}
        onClick={onDelete}
      />

      <Edit
        style={{ marginRight: "10px", cursor: "pointer" }}
        size={"22px"}
        onClick={onEdit}
      />

      <Archive
        style={{ cursor: "pointer" }}
        size={"22px"}
        onClick={onArchive}
      />
    </>
  );
}

export default ListControlPanel;
