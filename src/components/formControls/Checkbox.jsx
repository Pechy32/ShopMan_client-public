import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function Checkbox({ label, initialCheck, onChange }) {
  const [checked, setChecked] = useState(initialCheck);

  useEffect(() => {
    setChecked(initialCheck);
  }, [initialCheck]);

  const handleChange = (e) => {
    const value = e.target.checked;
    setChecked(value);

    // 🔥 SEND VALUE TO THE PARENT
    onChange && onChange(value);
  };

  return (
    <Form>
      <Form.Check
        type="checkbox"
        label={label}
        checked={checked}
        onChange={handleChange}
      />
    </Form>
  );
}

export default Checkbox;
