function ListItemMeta({ createdDate, updatedDate, ownerName, membersNames }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Created: {createdDate}</span>
            <span>Updated: {updatedDate}</span>
            <span>Owner: {ownerName}</span>

            {membersNames && membersNames.length > 0 && (
                <span>Members: {membersNames.join(", ")}</span>
            )}
        </div>
    );
}

export default ListItemMeta;
