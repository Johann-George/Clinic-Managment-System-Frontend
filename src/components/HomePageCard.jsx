import React from 'react'
import patientImg from "../assets/patient.jpeg";
import doctorImg from "../assets/doctor.jpeg";
import receptionistImg from "../assets/receptionist.jpeg";
import { Link } from 'react-router-dom';

function HomePageCard() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* Doctor Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <img 
            src={doctorImg}
              alt="Doctor" 
              className="card-img-top rounded-top-4"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Doctor</h5>
              <p className="card-text text-muted">
                View schedules, manage patients, and update prescriptions.
              </p>
              <Link to="/doctor" className="btn btn-primary mt-2">Get Started</Link>
            </div>
          </div>
        </div>

        {/* Patient Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <img 
              src={patientImg}
              alt="Patient" 
              className="card-img-top rounded-top-4"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Patient</h5>
              <p className="card-text text-muted">
                Book appointments, check reports, and consult with doctors.
              </p>
              <Link to="/patient" className="btn btn-primary mt-2">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow border-0 rounded-4 h-100">
            <img 
              src={receptionistImg}
              alt="Receptionist" 
              className="card-img-top rounded-top-4"
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Receptionist</h5>
              <p className="card-text text-muted">
                Manage patient registrations, schedule appointments, and update visit records.
              </p>
              <Link to="/receptionist" className="btn btn-primary mt-2">Get Started</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePageCard