import { FileEarmarkMedicalFill } from "react-bootstrap-icons";

function ListItemHeader({ title, itemCount }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FileEarmarkMedicalFill
        size={25}
        style={{ alignSelf: "center", marginRight: "10px" }}
      />
      <h2>
        {title} ({itemCount})
      </h2>
    </div>
  );
}

export default ListItemHeader;
