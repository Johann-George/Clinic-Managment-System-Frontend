import React from 'react'
import { Form } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { useActionData, useNavigation } from 'react-router-dom';
import { useEffect,useRef } from 'react';
import { toast } from 'react-toastify';
import PageTitle from '../../components/PageTitle';

function Registration() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(()=>{
    if(actionData?.success){
      formRef.current?.reset();
      toast.success("Patient successfully registered");
    }
  },[actionData]);

  return (
    <>
      <PageTitle title = "Patient Registration" />
      <div className='container mt-5 mb-5'>
        <Form ref={formRef} method="POST" className="row g-3">
          <div className="col-md-5">
            <label htmlFor="validationDefault01" className="form-label">Full name</label>
            <input type="text" className="form-control" id="validationDefault01" name="fullName" required/>
          </div>
          <div className="col-md-5">
            <label htmlFor="validationDefault03" className="form-label">Date Of Birth</label>
            <input type="date" className="form-control" id="validationDefault02" name="dob" required/>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefaultUsername" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend2">@</span>
              <input type="text" className="form-control" id="validationDefaultUsername" name="username" aria-describedby="inputGroupPrepend2" required/>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationDefault04" className='form-label'>Password</label>
            <input type="password" className="form-control" id="inputPassword4" name="password" placeholder="Password"/>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault05" className="form-label">Gender</label>
            <select className="form-select" id="validationDefault04" name="gender" required defaultValue="">
              <option value="" disabled>Choose...</option>
              <option>MALE</option>
              <option>FEMALE</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="validationDefault06" className="form-label">Address</label>
            <input type="text" className="form-control" id="validationDefault03" name="address" required/>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationDefault07" className="form-label">Contact No</label>
            <input type="tel" className="form-control" id="validationDefault05" name="contactNo" pattern='[0-9]{10}' required/>
          </div>
          <div className="col-12 ">
            <button disabled={isSubmitting} className="btn btn-primary" type="submit">
              {isSubmitting? "Registering" : "Register"}
            </button>
          </div>
        </Form> 
      </div>
    </>
  ); 
}

export default Registration

export async function patientRegister({request, params}) {
  const data = await request.formData();
  const userData = {
    username: data.get("username"),
    password: data.get("password")
  }
  const patientData = {
    name : data.get("fullName"),
    dob: data.get("dob"),
    gender: data.get("gender"),
    address: data.get("address"),
    contactNo: data.get("contactNo"),
    user: userData
  }
  try{
    await apiClient.post("patient/register",patientData)
    return {success:"true"};
  }
  catch(error){
    throw new Response(
      error.message || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}