import React, { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import apiClient from "../../api/apiClient";
import StaffTable from "../../components/StaffTable";

export default function AdminDashboard() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [editState, setEditState] = useState({ isEditing: false, data: null });

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Staff successfully registered");
    }
  }, [actionData]);

  const apiCall = async (requestFn, successMsg) => {
    try {
      const res = await requestFn();
      toast.success(successMsg);
      return res;
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const staffName = e.target.username.value.trim();
    if (!staffName) return;

    setSearchLoading(true);
    setSearchResult(null);

    try {
      const response = await apiClient.get(`/staff/${staffName}`);
      setSearchResult(response.data);
    } catch (error) {
      toast.error("Staff not found or an error occurred");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!searchResult) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete?"
    );
    if(!confirmed) return;
    await apiCall(
      () => apiClient.delete(`/staff/${searchResult.staffId}`),
      "Staff successfully deleted"
    );
    setSearchResult(null);
    setEditState({ isEditing: false, data: null });
  };

  const startEdit = () => {
    setEditState({ isEditing: true, data: { ...searchResult } });
  };

  const cancelEdit = () => {
    setEditState({ isEditing: false, data: null });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  };

  const handleUpdate = async () => {
    if (!searchResult) return;
    await apiCall(
      () => apiClient.put(`/staff/${searchResult.staffId}`, editState.data),
      "Staff details updated correctly"
    );
    setSearchResult(editState.data);
    setEditState({ isEditing: false, data: null });
  };

  const handleEditToggle = () => {
    if (editState.isEditing) handleUpdate();
    else startEdit();
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
                  id="validationDefault06"
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
              <StaffTable
                data={editState.isEditing ? editState.data : searchResult}
                isEditing={editState.isEditing}
                onChange={handleEditChange}
                onDelete={handleDelete}
                onEditToggle={handleEditToggle}
                onCancel={cancelEdit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

