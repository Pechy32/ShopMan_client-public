import { Fragment } from "react";
import ListItem from "./ListItem";

function ListContainer({ items, onSelect }) {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <div
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={() => onSelect(item)}
          >
            <ListItem
              title={item.name}
              itemCount={item.items.length}
              createdDate={item.createdDate}
              updatedDate={item.updatedDate}
              ownerName={item.owner.name}
              membersNames={item.members.map(m => m.name)}
              isArchived={item.isArchived}
            />
          </div>

          {index < items.length - 1 && <hr />}
        </Fragment>
      ))}
    </>
  );
}

export default ListContainer;
