import Checkbox from "../formControls/Checkbox";
import Delete from "../formControls/DeleteButton";

function Item({ id, name, solvedBy, onToggleSolved, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "6px",
        padding: "6px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <Checkbox
        label={name}
        initialCheck={!!solvedBy}
        onChange={onToggleSolved}
      />
      <Delete
        size={"15px"}
        style={{ marginLeft: "8px", cursor: "pointer" }}
        onClick={onDelete}
      />
    </div>
  );
}

export default Item;
