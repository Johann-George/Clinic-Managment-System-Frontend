import React from 'react'

function PatientDashboard() {
  return (
    <div className='container mt-5 mb-5'>
      <form className="row g-3">
        <div className="col-md-6">
            <label htmlFor="appointmentDate" className="form-label">Enter Doctor Username</label>
            <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                <input type="text" className="form-control" id="doctorUsername" required/>
            </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="appointmentDate" className="form-label">Select Date</label>
          
          <input 
            type="date" 
            className="form-control" 
            id="appointmentDate" 
            required 
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Book Appointment</button>
        </div>
      </form>
    </div>
  );
}

export default PatientDashboard