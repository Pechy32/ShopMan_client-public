import ItemSwitch from "./ItemSwitchButton";
import MemberSwitch from "./MemberSwitchButton";

function ListSwitchPanel({ currentView, onSwitchChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ItemSwitch
        size={25}
        style={{
          marginRight: "10px",
          cursor: "pointer",
          color: currentView === "items" ? "#0d6efd" : "#888",
        }}
        onClick={() => onSwitchChange("items")}
      />
      <MemberSwitch
        size={24}
        style={{
          cursor: "pointer",
          color: currentView === "members" ? "#0d6efd" : "#888",
        }}
        onClick={() => onSwitchChange("members")}
      />
    </div>
  );
}

export default ListSwitchPanel;
