import React from 'react'

function Registration() {
  return (
    <>
      <div className='container mt-5 mb-5'>
        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="validationDefault01" className="form-label">First name</label>
            <input type="text" className="form-control" id="validationDefault01" required/>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefault02" className="form-label">Last name</label>
            <input type="text" className="form-control" id="validationDefault02" required/>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault03" className="form-label">Date Of Birth</label>
            <input type="date" className="form-control" id="validationDefault03" required/>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefaultUsername" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend2">@</span>
              <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefault04" className='form-label'>Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault05" className="form-label">Gender</label>
            <select className="form-select" id="validationDefault04" required>
              <option selected disabled value="">Choose...</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="validationDefault06" className="form-label">Address</label>
            <input type="text" className="form-control" id="validationDefault03" required/>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault07" className="form-label">Contact No</label>
            <input type="tel" className="form-control" id="validationDefault05" pattern='[0-9]{10}' required/>
          </div>
          <div className="col-12 ">
            <button className="btn btn-primary" type="submit">Register</button>
          </div>
        </form> 
      </div>
    </>
  ); 
}

export default Registration