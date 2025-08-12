import React from "react";
import EditableCell from "./EditableCell";

function StaffTable({ data, isEditing, onChange, onDelete, onEditToggle, onCancel}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">DOB</th>
          <th scope="col">Gender</th>
          <th scope="col">Address</th>
          <th scope="col">Designation</th>
          <th scope="col">Action 1</th>
          <th scope="col">Action 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <EditableCell
                isEditing={isEditing} 
                name="name"
                value={data.name}
                onChange={onChange}
            />
          </td>
          <td>{data.user?.username}</td>
          <td>
            <EditableCell
                isEditing={isEditing} 
                name="dob"
                value={data.dob}
                onChange={onChange}
            />
          </td>
          <td>
            <EditableCell 
                isEditing={isEditing} 
                name="gender"
                value={data.gender}
                onChange={onChange}
            />
          </td>
          <td>
            <EditableCell 
                isEditing={isEditing} 
                name="address"
                value={data.address}
                onChange={onChange}
            />
          </td>
          <td>
            <EditableCell 
                isEditing={isEditing} 
                name="designation"
                value={data.designation}
                onChange={onChange}
            />
          </td>
          <td>
            <button
              type="button"
              onClick={onDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={onEditToggle}
              className="btn btn-primary"
            >
              {isEditing ? "Save" : "Update"}
            </button>
          </td>
          <td>
            {isEditing && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default StaffTable;
