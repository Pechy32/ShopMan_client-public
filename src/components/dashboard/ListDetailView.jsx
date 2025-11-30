import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../auth/AuthService";

import ListItem from "../list/ListItem";
import ItemContainer from "../item/ItemContainer";
import ListControlPanel from "./ListControlPanel";
import ListSwitchPanel from "../formControls/ListSwitchPanel";
import EditListModal from "./EditListModal";
import ItemControlPanel from "./ItemControlPanel";
import AddItemModal from "./AddItemModal";
import MemberContainer from "../member/MemberContainer";
import MemberControlPanel from "./MemberControlPanel";
import AddMemberModal from "./AddMemberModal";
import { formatDate } from "../utils/formatDate";



function ListDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  const [showSolved, setShowSolved] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [currentView, setCurrentView] = useState("items"); // "items" | "members"

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // LOAD DATA
  const loadData = async () => {
    try {
      const [listsRes, usersRes] = await Promise.all([
        fetch("http://localhost:3001/shoppingLists"),
        fetch("http://localhost:3001/users"),
      ]);

      const [lists, users] = await Promise.all([
        listsRes.json(),
        usersRes.json(),
      ]);

      const userMap = Object.fromEntries(users.map(u => [u.id, u]));

      const populated = lists.map(l => ({
        ...l,
        owner: userMap[l.ownerId],
        members: l.membersIds.map(m => userMap[m]),
        items: l.items.map(i => ({
          ...i,
          createdByUser: userMap[i.createdBy],
          solvedByUser: i.solvedBy ? userMap[i.solvedBy] : null,
        }))
      }));

      const found = populated.find(l => l.id === id);
      if (!found) throw new Error("List not found");

      setList(found);

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!list && !error) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // DELETE LIST
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this list?")) return;

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "DELETE"
    });

    navigate("/dashboard");
  };

  // ARCHIVE / UNARCHIVE LIST
  const handleArchive = async () => {
    const updated = {
      ...list,
      isArchived: !list.isArchived,
      updatedDate: new Date().toISOString()
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setList(updated);
    navigate("/dashboard", { state: { refresh: true } });

  };

  // EDIT LIST
  const handleEdit = async (newName) => {
    const updated = {
      ...list,
      name: newName,
      updatedDate: new Date().toISOString()
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setList(updated);
    setShowEditModal(false);
  };

  // TOGGLE SOLVED ITEM
  const handleToggleItemSolved = async (itemId) => {
    const updatedItems = list.items.map(item =>
      item.id === itemId
        ? {
          ...item,
          solvedBy: item.solvedBy ? null : getUser().id,
          solvedByUser: item.solvedBy ? null : getUser()
        }
        : item
    );

    const updatedList = {
      ...list,
      items: updatedItems,
      updatedDate: new Date().toISOString()
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList)
    });

    setList(updatedList);
  };

  // ADD ITEM
  const handleAddItem = async (newItem) => {
    const updatedList = {
      ...list,
      items: [...list.items, newItem],
      updatedDate: new Date().toISOString()
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList)
    });

    setList(updatedList);
  };

  // DELETE ITEM
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const updatedItems = list.items.filter(item => item.id !== itemId);
    const updatedList = {
      ...list,
      items: updatedItems,
      updatedDate: new Date().toISOString()
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList)
    });

    setList(updatedList);
  };

  // AUTH
  const user = getUser();
  const isOwner = list.ownerId === user.id;

  // FILTER SOLVED / UNSOLVED
  const visibleItems = showSolved
    ? list.items
    : list.items.filter(i => !i.solvedBy);

  // ITEM COUNTING
  const solvedCount = list.items.filter(i => i.solvedBy).length;
  const totalCount = list.items.length;

  // MEMBER DELETE
  const handleDeleteMember = async (memberId) => {
    if (!isOwner && memberId !== user.id) {
      alert("You can only remove yourself from this list.");
      return;
    }

    const confirmMessage = isOwner
      ? "Are you sure you want to remove this member?"
      : "Are you sure you want to leave this list?";

    if (!window.confirm(confirmMessage)) return;

    const updatedList = {
      ...list,
      membersIds: list.membersIds.filter((id) => id !== memberId),
      updatedDate: new Date().toISOString(),
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList({
      ...updatedList,
      members: list.members.filter((m) => m.id !== memberId),
    });

    if (memberId === user.id && !isOwner) {
      alert("You have left this list.");
      navigate("/dashboard");
    }
  };


  // MEMBER ADD
  const handleAddMember = async (user) => {
    if (!isOwner) {
      alert("Only the owner can perform this action.");
      return;
    }

    const updatedList = {
      ...list,
      membersIds: [...list.membersIds, user.id],
      updatedDate: new Date().toISOString(),
    };

    await fetch(`http://localhost:3001/shoppingLists/${list.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList({
      ...updatedList,
      members: [...list.members, user],
    });
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
          padding: "6px 0",
        }}
      >
        <div>
          <ListItem
            title={list.name}
            itemCount={list.items.length}
            createdDate={formatDate(list.createdDate)}
            updatedDate={formatDate(list.updatedDate)}
            ownerName={list.owner.name}
            membersNames={list.members.map(m => m.name)}
          />
        </div>
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)} style={{ alignSelf: "flex-start" }}>
          ← Back
        </button>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <div>
          {isOwner && (
            <ListControlPanel
              onArchive={handleArchive}
              onDelete={handleDelete}
              onEdit={() => setShowEditModal(true)}
            />
          )}
        </div>
        <div>
          <ListSwitchPanel
            currentView={currentView}
            onSwitchChange={setCurrentView}
          />
        </div>
      </div>


      <hr />

      {/* Scrollable main section */}
      <div
        style={{
          maxHeight: "55vh",
          overflowY: "auto",
          paddingRight: "5px",
          marginBottom: "80px",
        }}
      >
        {currentView === "items" ? (
          <ItemContainer
            items={visibleItems}
            onToggleSolved={handleToggleItemSolved}
            onDelete={handleDeleteItem}
          />
        ) : (
          <MemberContainer
            members={list.members}
            onDelete={handleDeleteMember}
            ownerId={list.ownerId}
          />
        )}
      </div>

      {/* Sticky bottom control panel */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "white",
          zIndex: 100,
          padding: "10px 20px",
        }}
      >
        {currentView === "items" ? (
          <ItemControlPanel
            showSolved={showSolved}
            onToggleShowSolved={setShowSolved}
            solvedCount={solvedCount}
            totalCount={totalCount}
            onAddItemClick={() => setShowAddItemModal(true)}
          />
        ) : (
          isOwner && (
            <MemberControlPanel onAddMemberClick={() => setShowAddMemberModal(true)} />
          )
        )}
      </div>



      {/* EDIT LIST MODAL */}
      {showEditModal && (
        <EditListModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          list={list}
          onSave={handleEdit}
        />
      )}

      {/* ADD ITEM MODAL */}
      {showAddItemModal && (
        <AddItemModal
          show={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
          onSave={handleAddItem}
        />
      )}

      {/* ADD MEMBER MODAL */}
      {showAddMemberModal && (
        <AddMemberModal
          show={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onSave={handleAddMember}
          existingMemberIds={list.membersIds}
          ownerId={list.ownerId}
        />
      )}

    </>
  );

}

export default ListDetailView;
