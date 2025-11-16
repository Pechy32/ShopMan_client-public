import Form from "react-bootstrap/Form";

/**
* Universal Select component for React Bootstrap
*
* Props:
* - label: text to display above select
* - value: currently selected value (ID or entire object)
* - onChange: function (selectedValue) -> void
* - options: array of items [{ value, label }] OR arbitrary objects
* - getOptionLabel: (item) => string ← how to display the text
* - getOptionValue: (item) => any ← how to extract the value
* - error: validation error text
* - disabled: boolean
* - placeholder: default text
*/
function SelectInput({
    label,
    value,
    onChange,
    options,
    getOptionLabel = item => item.label,
    getOptionValue = item => item.value,
    error = "",
    disabled = false,
    placeholder = "Vyberte položku..."
}) {
    return (
        <Form.Group className="mb-3">
            {label && <Form.Label className="fw-semibold">{label}</Form.Label>}

            <Form.Select
                value={value ?? ""}
                disabled={disabled}
                isInvalid={!!error}
                onChange={e => {
                    const selected = options.find(
                        opt => String(getOptionValue(opt)) === String(e.target.value)
                    );
                    onChange(selected ?? null);
                }}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {options.map(option => (
                    <option
                        key={getOptionValue(option)}
                        value={getOptionValue(option)}
                    >
                        {getOptionLabel(option)}
                    </option>
                ))}
            </Form.Select>

            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
    );
}

export default SelectInput;
