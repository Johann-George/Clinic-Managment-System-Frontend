import React, { useEffect, useRef } from "react";
import PatientRegister from "../../components/PatientRegister";
import { useActionData, useNavigation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

function ReceptionistDashboard() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Patient successfully registered");
    }
  }, [actionData]);
  return (
    <>
      <PageTitle title="Receptionist Dashboard" />
      <PatientRegister isSubmitting={isSubmitting} formRef={formRef} />
      <div className="container mt-4">
        <form className="row g-3">
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
                name="doctorUsername"
                id="doctorUsername"
                required
              />
            </div>
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
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? "Booking" : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReceptionistDashboard;
