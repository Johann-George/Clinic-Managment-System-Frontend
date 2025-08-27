import React, { useEffect, useRef } from "react";
import PatientRegister from "../../components/PatientRegister";
import { Form, useActionData, useNavigation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";

function ReceptionistDashboard() {
  const actionData = useActionData();
  const registerFormRef = useRef(null);
  const bookFormRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData) {
      if (actionData.type === 'register' && actionData.success) {
        toast.success(actionData.message);
        registerFormRef.current?.reset();
      }

      if (actionData.type === 'book' && actionData.success) {
        toast.success(actionData.message);
        bookFormRef.current?.reset();
        alert(`Your Token Number is ${actionData.tokenNo}`);
      }
    }
  }, [actionData]);
  return (
    <>
      <PageTitle title="Receptionist Dashboard" />
      <PatientRegister isSubmitting={isSubmitting} formRef={registerFormRef} actionData={actionData}/>
      <div className="container mt-4">
        <Form method="POST" ref={bookFormRef} className="row g-3">
          <h4>Book Appointment</h4>
          <input type="hidden" name="actionType" value="book" />
          <div className="col-md-6">
            <label htmlFor="doctorUsername" className="form-label">
              Enter Doctor Username
            </label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend2">
                @
              </span>
              <input
                type="text"
                className="form-control"
                name="doctorUsername"
                id="doctorUsername"
                required
              />
            </div>
            {actionData?.errors?.doctorUsername && (
                <p className="text-danger small mt-1">{actionData.errors.doctorUsername}</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="doctorUsername" className="form-label">
              Enter Patient Username
            </label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend2">
                @
              </span>
              <input
                type="text"
                className="form-control"
                name="patientUsername"
                id="patientUsername"
                required
              />
            </div>
            {actionData?.errors?.patientUsername && (
                <p className="text-danger small mt-1">{actionData.errors.patientUsername}</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="appointmentDate" className="form-label">
              Select Date
            </label>

            <input
              type="date"
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              required
            />
            {actionData?.errors?.appointmentDate && (
                <p className="text-danger small mt-1">{actionData.errors.appointmentDate}</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="appointmentTime" className="form-label">
              Select Time
            </label>

            <input
              type="time"
              className="form-control"
              id="appointmentTime"
              name="appointmentTime"
              required
            />
          </div>
          {actionData?.errors?.appointmentTime && (
                <p className="text-danger small mt-1">{actionData.errors.appointmentTime}</p>
          )}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? "Booking" : "Book"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ReceptionistDashboard;
