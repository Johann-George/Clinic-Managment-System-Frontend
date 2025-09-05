import React from "react";
import { Form } from "react-router-dom";

export default function PatientRegister({isSubmitting, formRef, actionData}) {
  return (
    <>
      <div className="container mt-5 mb-5">
        <Form ref={formRef} method="POST" className="row g-3">
          <h4>Patient Registration</h4>
          <input type="hidden" name="actionType" value="register"/>
          <div className="col-md-5">
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
            {actionData?.errors?.name && (
              <p className="text-danger small mt-1">{actionData.errors.name}</p>
            )}
          </div>
          <div className="col-md-5">
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
            {actionData?.errors?.dob && (
                    <p className="text-danger small mt-1">{actionData.errors.dob}</p>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefaultUsername" className="form-label">
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
            {actionData?.errors?.["user.username"] && (
                <p className="text-danger small mt-1">{actionData.errors["user.username"]}</p>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefault03" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              placeholder="Password"
              required
            />
            {actionData?.errors?.["user.password"] && (
              <p className="text-danger small mt-1">{actionData.errors["user.password"]}</p>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault04" className="form-label">
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
              <option>Male</option>
              <option>Female</option>
            </select>
            {actionData?.errors?.gender && (
              <p className="text-danger small mt-1">{actionData.errors.gender}</p>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="validationDefault05" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault05"
              name="address"
              required
            />
            {actionData?.errors?.address && (
              <p className="text-danger small mt-1">{actionData.errors.address}</p>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault06" className="form-label">
              Contact No
            </label>
            <input
              type="tel"
              className="form-control"
              id="validationDefault06"
              name="contactNo"
              pattern="[0-9]{10}"
              required
            />
            {actionData?.errors?.contactNo && (
              <p className="text-danger small mt-1">{actionData.errors.contactNo}</p>
            )}
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
    </>
  );
}
