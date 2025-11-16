import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddMemberModal({ show, onClose, onSave, existingMemberIds, ownerId }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // load all users
    useEffect(() => {
        if (!show) return;

        const loadUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3001/users");
                const data = await res.json();

                // filter already existed members and owner
                const filtered = data.filter(
                    (u) => !existingMemberIds.includes(u.id) && u.id !== ownerId
                );

                setUsers(filtered);
            } catch (err) {
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [show, existingMemberIds, ownerId]);

    const handleSave = () => {
        if (!selectedUser) {
            setError("Please select a user.");
            return;
        }

        const user = users.find((u) => u.id === selectedUser);
        if (!user) {
            setError("Invalid user selection.");
            return;
        }

        onSave(user); 
        onClose();
        setSelectedUser("");
        setError("");
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Member</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading ? (
                    <div className="text-center py-3">
                        <div className="spinner-border" role="status" />
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <Form>
                        <Form.Group>
                            <Form.Label>Select user to add:</Form.Label>
                            <Form.Select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option value="">-- Select user --</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!selectedUser || loading}
                >
                    Add Member
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddMemberModal;
