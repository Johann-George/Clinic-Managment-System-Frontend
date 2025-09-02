import React, { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import apiClient from "../../api/apiClient";
import StaffTable from "../../components/StaffTable";

export default function AdminDashboard() {
  const actionData = useActionData();
  const addFormRef = useRef(null);
  const searchFormRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNo: "",
    username: "",
    password: "",
    gender: "",
    address: "",
    designation: ""
  })
  //const [editState, setEditState] = useState({ isEditing: false, data: null });

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.message);
      clearForm();
      //formRef.current?.reset();
    }
  }, [actionData]);

  const clearForm = () => {
    setFormData({
      name: "",
      dob: "",
      contactNo: "",
      username: "",
      password: "",
      gender: "",
      address: "",
      designation: ""
    });
    setSearchResult(null);
    setIsEditMode(false);
    addFormRef.current?.reset();
  };

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
      const staffData = response.data;

      setFormData({
        name : staffData.name || "",
        dob: staffData.dob || "",
        contactNo: staffData.contactNo || "",
        username: staffData.user.username || "",
        password: "", // Don't populate password for security
        gender: staffData.gender || "",
        address: staffData.address || "",
        designation: staffData.designation || ""
      });
      setSearchResult(staffData);
      setIsEditMode(true);
      toast.success("Staff found!");
    } catch (error) {
      toast.error("Staff not found or an error occurred");
    } finally {
      setSearchLoading(false);
      searchFormRef.current?.reset();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async () => {

    if (!searchResult) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete ${searchResult.name}?"
    );

    if (!confirmed) return;

    await apiCall(
      () => apiClient.delete(`/staff/${searchResult.staffId}`),
      "Staff successfully deleted"
    );
    clearForm();
    //setSearchResult(null);
    //setEditState({ isEditing: false, data: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!searchResult) return;

    //const updateData = { ...formData };
    const userData = {
      username: formData.username,
    }
    const updateData = {
      name : formData.name,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      designation: formData.designation,
      contactNo: formData.contactNo,
      user: userData
    }
    
    const success = await apiCall(
      () => apiClient.put(`/staff/${searchResult.staffId}`, updateData),
      "Staff details updated correctly"
    );
    if (success) {
      setSearchResult({ ...searchResult, ...updateData });
    }
    clearForm();
    //setSearchResult(editState.data);
    //setEditState({ isEditing: false, data: null });
  };

  const handleCancelEdit = () => {
    clearForm();
    toast.info("Edit cancelled");
  };

  const handleFormSubmit = isEditMode ? handleUpdate : undefined;

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h4>{isEditMode ? "Edit Staff" : "Add Staff"}</h4>
              <div className="d-flex align-items-center gap-3">
                <Form method="GET" ref={searchFormRef} onSubmit={handleSearch} className="d-flex align-items-center">
                  <div className="input-group" >
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Enter Staff Username"
                      name="username"
                      aria-label="Search"
                    />
                    <button
                      className="btn btn-outline-success"
                      type="submit"
                      disabled={searchLoading}
                    >
                      {searchLoading ? "..." : "Search"}
                    </button>
                  </div>
                </Form>
                {isEditMode && (
                  <div>
                    <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>Delete Staff</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel Edit</button>
                  </div>
                )}
              </div>
            </div>
            <Form ref={addFormRef} method={isEditMode ? "GET" : "POST"} onSubmit={handleFormSubmit} className="g-3 row">
              <div className="col-md-4">
                <label htmlFor="validationDefault01" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {actionData?.errors?.name && (
                  <p className="text-danger small mt-1">{actionData.errors.name}</p>
                )}
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
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
                {actionData?.errors?.dob && (
                  <p className="text-danger small mt-1">{actionData.errors.dob}</p>
                )}
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
                  pattern="[0-9]{10}"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                />
                {actionData?.errors?.contactNo && (
                  <p className="text-danger small mt-1">{actionData.errors.contactNo}</p>
                )}
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
                    minLength={3}
                    maxLength={10}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {actionData?.errors?.["user.username"] && (
                  <p className="text-danger small mt-1">{actionData.errors["user.username"]}</p>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault04" className="form-label">
                  Password {isEditMode && <small className="text-muted">(password is hidden for security reasons)</small>}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  minLength={5}
                  maxLength={15}
                  required={!isEditMode}
                  disabled={isEditMode}
                />
                {actionData?.errors?.["user.password"] && (
                  <p className="text-danger small mt-1">{actionData.errors["user.password"]}</p>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="validationDefault05" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="validationDefault04"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
                {actionData?.errors?.gender && (
                  <p className="text-danger small mt-1">{actionData.errors.gender}</p>
                )}
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
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                {actionData?.errors?.address && (
                  <p className="text-danger small mt-1">{actionData.errors.address}</p>
                )}
              </div>
              <div className="col-md-5">
                <label htmlFor="validationDefault07" className="form-label">
                  Designation
                </label>
                <select
                  className="form-select"
                  id="validationDefault07"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option>Doctor</option>
                  <option>Receptionist</option>
                </select>
                {actionData?.errors?.designation && (
                  <p className="text-danger small mt-1">{actionData.errors.designation}</p>
                )}
              </div>

              <div className="col-12 ">
                <button
                  disabled={isSubmitting}
                  className={`btn ${isEditMode ? "btn-success" : "btn-primary"}`}
                  type="submit"
                >
                  {isSubmitting ?
                    (isEditMode ? "Updating..." : "Registering...") :
                    (isEditMode ? "Update Staff" : "Register Staff")
                  }
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

