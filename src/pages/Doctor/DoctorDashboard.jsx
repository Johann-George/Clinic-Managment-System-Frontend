import React from 'react'

function DoctorDashboard() {
    return (
    <>
        <div className='container mt-5 mb-5'>
            <form className="row g-3">
                <h4>Conduct Consultation</h4>
                <div className="col-md-6">
                    <label htmlFor="validationDefault01" className="form-label">Patient Username</label>
                    <div className='input-group'>
                        <span className="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" className="form-control" id="validationDefault01" required/>
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationDefault02" className="form-label">Diagnosis Details</label>
                    <input type="text" className="form-control" id="validationDefault02" required/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationDefault03" className="form-label">Prescribe Medicine</label>
                    <div className="input-group">
                    <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
                    <button type="submit" className="btn btn-primary ">Add</button>
                    </div>
                </div>
                <div className="col-md-4">
                    
                    <label htmlFor="validationDefaultUsername" className="form-label">Prescribe Lab Test</label>
                    
                    <div className="input-group">
                    <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
                    <button type="submit" className="btn btn-primary ">Add</button>
                    </div>
                </div>

                <div className="col-12 ">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>

                <h4>View Patient History</h4>
                <div className="col-md-4">
                    <label htmlFor="validationDefault03"  className="form-label">Patient Username</label>
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" className="form-control" placeholder="Enter Patient Username" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
                        <button type="submit" className="btn btn-primary ">View</button>
                    </div>
                </div>
            </form> 
      </div>
    </>
  );
}

export default DoctorDashboard