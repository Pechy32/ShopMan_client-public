import Item from "./Item";

function ItemContainer({ items, onToggleSolved, onDelete }) {
  return (
    <>
      {items.map(item => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          solvedBy={item.solvedBy}
          onToggleSolved={() => onToggleSolved(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </>
  );
}

export default ItemContainer;
