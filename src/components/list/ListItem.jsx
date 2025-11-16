import ListItemHeader from "./ListItemHeader";
import ListItemMeta from "./ListItemMeta";

function ListItem({ title, itemCount, createdDate, updatedDate, ownerName, membersNames, isArchived }) {

  return (
    <>
      <ListItemHeader
        title={title}
        itemCount={itemCount}
      />

      <ListItemMeta
        createdDate={createdDate}
        updatedDate={updatedDate}
        ownerName={ownerName}
        membersNames={membersNames}
      />

      {isArchived && (
        <span
          className="badge bg-secondary"
          style={{ fontSize: "0.75rem" }}
        >
          ARCHIVED
        </span>
      )}

    </>
    
  );
}

export default ListItem;
