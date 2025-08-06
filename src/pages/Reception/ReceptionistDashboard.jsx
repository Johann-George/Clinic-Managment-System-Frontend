import React from 'react';

function ReceptionistDashboard() {
  return (
    <div className="container mt-4">
      <form className="row g-3">

        <div className="col-4">
          <button type="submit" className="btn btn-primary">Go To Patient Registration</button>
        </div>

        <div className="col-md-12">
          <label htmlFor="patientUsername" className="form-label">Book Appointment</label>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Patient Username"
            id="patientUsername"
            required
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Doctor Username"
            id="doctorUsername"
            required
          />
        </div>

        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">Book</button>
        </div>

      </form>
    </div>
  );
}

export default ReceptionistDashboard;