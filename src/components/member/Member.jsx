import { Person } from "react-bootstrap-icons";
import Delete from "../formControls/DeleteButton";

function Member({ id, name, email, onDelete, currentUserId, ownerId }) {
  const isSelf = id === currentUserId;
  const isOwner = currentUserId === ownerId;

  const canDelete = onDelete && (isSelf || isOwner);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
        padding: "6px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Person size={30} style={{ marginRight: "8px", color: "#555" }} />
        <div>
          <div>{name}</div>
          {email && <small className="text-muted">{email}</small>}
        </div>
      </div>

      {canDelete && (
        <Delete
          size={"15px"}
          style={{ marginLeft: "8px", cursor: "pointer" }}
          onClick={() => onDelete(id)}
        />
      )}
    </div>
  );
}

export default Member;
