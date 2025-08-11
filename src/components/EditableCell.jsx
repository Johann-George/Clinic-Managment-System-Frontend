import React from 'react'

function EditableCell({ isEditing, name, value, onChange }) {
  return isEditing ? (
    <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className='form-control'
    />
  ) : (
    value
  );
}

export default EditableCell