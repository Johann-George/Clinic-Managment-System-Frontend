import React, { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import apiClient from "../../api/apiClient";

export default function AdminDashboard() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(null);

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Staff successfully registered");
    }
    if (searchResult) {
      setEditableData({ ...searchResult });
    }
  }, [actionData, searchResult]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const staffName = e.target.username.value.trim();

    setSearchLoading(true);
    setSearchResult(null);

    try {
      const response = await apiClient.get(`/staff/${staffName}`);
      setSearchResult(response.data);
    } catch (error) {
      toast.error("Staff not found or an error occurred");
      setSearchResult(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const staffId = searchResult.staffId;
    try {
      await apiClient.delete(`/staff/${staffId}`);
      toast.success("Staff successfully deleted");
      return { success: "true" };
    } catch (error) {
      throw new Response(
        error.message || "Failed to submit your message. Please try again.",
        { status: error.status || 500 }
      );
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    const staffId = searchResult.staffId;
    try {
      await apiClient.put(`/staff/${staffId}`, editableData);
      toast.success("Staff details updated correctly");
      setIsEditing(false);
      setSearchResult(editableData);
    } catch (error) {
      throw new Response(
        error.message || "Failed to submit your message. Please try again.",
        { status: error.status || 500 }
      );
    }
  };

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <Form ref={formRef} method="POST" className="g-3 row">
              <h4>Add Staff</h4>
              <div className="col-md-4">
                <label htmlFor="validationDefault01" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  name="fullName"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault02" className="form-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="validationDefault02"
                  name="dob"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault03" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault03"
                  name="contactNo"
                  required
                />
              </div>
              <div className="col-md-4">
                <label
                  htmlFor="validationDefaultUsername"
                  className="form-label"
                >
                  Username
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend2">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefaultUsername"
                    name="username"
                    aria-describedby="inputGroupPrepend2"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault04" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault05" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="validationDefault04"
                  name="gender"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="validationDefault06" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault03"
                  name="address"
                  required
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="validationDefault07" className="form-label">
                  Designation
                </label>
                <select
                  className="form-select"
                  id="validationDefault07"
                  name="designation"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>Doctor</option>
                  <option>Receptionist</option>
                </select>
              </div>

              <div className="col-12 ">
                <button
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  type="submit"
                >
                  {isSubmitting ? "Registering" : "Register"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <Form method="GET" onSubmit={handleSearch} className="g-3 row">
              <h4>Search Staff</h4>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Enter Staff Username"
                  name="username"
                  aria-label="Search"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-success w-90"
                  type="submit"
                  disabled={searchLoading}
                >
                  {searchLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </Form>

            {/* Display Search Result */}
            {searchResult && (
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
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editableData.name}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      ) : (
                        searchResult.name
                      )}
                    </td>
                    <td>{searchResult.user.username}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="dob"
                          value={editableData.dob}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      ) : (
                        searchResult.dob
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="gender"
                          value={editableData.gender}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      ) : (
                        searchResult.gender
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editableData.address}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      ) : (
                        searchResult.address
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="designation"
                          value={editableData.designation}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      ) : (
                        searchResult.designation
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          if (isEditing) handleUpdate();
                          else setIsEditing(true);
                        }}
                        className="btn btn-primary"
                      >
                        {isEditing ? "Save" : "Update"}
                      </button>
                    </td>
                    <td>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setEditableData({ ...searchResult });
                          }}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
