import React from 'react';
import apiClient from '../../api/apiClient';
import { useActionData, useNavigation } from 'react-router-dom';
import { useEffect,useRef } from 'react';
import { toast } from 'react-toastify';
import PageTitle from '../../components/PageTitle';
import PatientRegister from '../../components/PatientRegister';

export default function Registration() {

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
      <PatientRegister 
        isSubmitting = {isSubmitting}
        formRef = {formRef}
        actionData = {actionData}
      />
    </>
  ); 
}

export async function patientRegister({request}) {
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
    await apiClient.post("/auth/register",patientData)
    return {success:"true"};
  }
  catch(error){
    if(error.status === 400){
      console.log("Entered here")
      return {
        success : false,
        errors: error.response?.data
      }
    }
    throw new Response(
      error.message || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}