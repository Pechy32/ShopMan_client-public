import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUser } from "../auth/AuthService";

function AddItemModal({ show, onClose, onSave }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Item name is required");
      return;
    }

    const user = getUser();

    const newItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdBy: user.id,
      solvedBy: null
    };

    onSave(newItem);

    setName("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name..."
            value={name}
            isInvalid={!!error}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Add Item</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItemModal;
