import React from 'react'

function AdminDashboard() {
  return (
    <>
        <div className='container mt-5 mb-5'>
            <form className="row g-3 align-items-end">
                <h4>Add Staff</h4>
                <div className="col-md-5">
                    <label htmlFor="validationDefault01" className="form-label">Staff Username</label>
                    <div className='input-group'>
                        <span className="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" className="form-control" id="validationDefault01" required/>
                    </div>
                </div>
                <div className="col-md-5">
                    <label htmlFor="validationDefault02" className="form-label">Role</label>
                    <select className="form-select" id="validationDefault02" required>
                        <option selected disabled value="">Choose...</option>
                        <option>Doctor</option>
                        <option>Receptionist</option>
                    </select>
                </div>
                <div className='col-md-2'>
                    <button type="submit" class="btn btn-primary w-75">Add</button>
                </div>

                <h4>Search Staff</h4>

                <div className="col-md-5">
                    <input className="form-control"  type="search" placeholder="Search" aria-label="Search"/>
                </div>
                <div className='col-md-2'>
                    <button className="btn btn-outline-success w-50" type="submit">Search</button>
                </div>
            </form>
        </div>
    </>
  );
}

export default AdminDashboard