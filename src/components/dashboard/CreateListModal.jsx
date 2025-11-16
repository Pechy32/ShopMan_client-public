import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUser } from "../auth/AuthService";

function CreateListModal({ show, onClose, onCreate }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async () => {
        if (!name.trim()) {
            setError("List name is required");
            return;
        }

        const user = getUser();

        const newList = {
            id: crypto.randomUUID(),
            name: name.trim(),
            ownerId: user.id,
            membersIds: [],
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            isArchived: false,
            items: []
        };

        await onCreate(newList);
        setName("");
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New List</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>List Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter list name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                        isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateListModal;
