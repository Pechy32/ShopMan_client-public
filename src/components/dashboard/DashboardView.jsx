import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ListContainer from "../list/ListContainer";
import DashboardControlPanel from "./DashboardControlPanel";
import CreateListModal from "./CreateListModal";
import { getUser } from "../auth/AuthService";

function DashboardView() {
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  // --- CONTROL PANEL STATE ---
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("updated");
  const [showArchived, setShowArchived] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  // --- FETCH & POPULATE ---
  useEffect(() => {
  const loadData = async () => {
    try {
      const [listsRes, usersRes] = await Promise.all([
        fetch("http://localhost:3001/shoppingLists"),
        fetch("http://localhost:3001/users"),
      ]);

      const [listsData, usersData] = await Promise.all([
        listsRes.json(),
        usersRes.json()
      ]);

      const userMap = Object.fromEntries(usersData.map(u => [u.id, u]));

      const populated = listsData.map(list => ({
        ...list,
        owner: userMap[list.ownerId],
        members: list.membersIds.map(m => userMap[m]),
        items: list.items.map(i => ({
          ...i,
          createdByUser: userMap[i.createdBy],
          solvedByUser: i.solvedBy ? userMap[i.solvedBy] : null,
        }))
      }));

      const authfilteredLists = populated.filter(list =>
        list.ownerId === user.id || list.membersIds.includes(user.id)
      );

      setLists(authfilteredLists);

    } catch (err) {
      setError(err.message);
    }
  };

  loadData();
}, [refreshFlag]);


  if (!lists && !error) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const user = getUser();

  // --- FILTERING & SORTING LOGIC ---
  const processedLists = useMemo(() => {
    let result = [...lists];

    // ARCHIVED toggle
    if (!showArchived) {
      result = result.filter(l => !l.isArchived);
    }

    // FILTER
    if (currentFilter === "my") {
      result = result.filter(l => l.ownerId === user.id);
    }
    if (currentFilter === "member") {
      result = result.filter(
        l => l.membersIds.includes(user.id) && l.ownerId !== user.id
      );
    }
    // "all" already correct — user is owner or member

    // SORT
    if (currentSort === "updated") {
      result.sort((a, b) =>
        new Date(b.updatedDate) - new Date(a.updatedDate)
      );
    }
    if (currentSort === "created") {
      result.sort((a, b) =>
        new Date(b.createdDate) - new Date(a.createdDate)
      );
    }

    return result;
  }, [lists, currentFilter, currentSort, showArchived, user.id]);

  // --- CREATE NEW LIST ---
  const handleCreateList = async (newList) => {
    const res = await fetch("http://localhost:3001/shoppingLists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList)
    });

    const saved = await res.json();

    setLists(prev => [...prev, saved]);

    // navigate to detail immediately
    navigate(`/dashboard/${saved.id}`);
  };


  // FILTER & SORT OPTIONS
  const filterOptions = [
    { value: "all", label: "All lists" },
    { value: "my", label: "My lists" },
    { value: "member", label: "Member lists" },
  ];

  const sortOptions = [
    { value: "updated", label: "Updated" },
    { value: "created", label: "Created" },
  ];

  return (
    <>
      <DashboardControlPanel
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        currentFilter={currentFilter}
        currentSort={currentSort}
        showArchived={showArchived}
        onFilterChange={setCurrentFilter}
        onSortChange={setCurrentSort}
        onShowArchivedChange={setShowArchived}
        onAddListClick={() => setShowCreateModal(true)}
      />

      <ListContainer
        items={processedLists}
        onSelect={list => navigate(`/dashboard/${list.id}`)}
      />

      {/* CREATE LIST MODAL */}
      <CreateListModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateList}
      />
    </>
  );
}

export default DashboardView;
