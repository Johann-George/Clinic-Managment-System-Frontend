import React, { useEffect, useState } from 'react'
import { Form, Link, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(actionData?.success){
      navigate(actionData.redirectTo, {state: {user: actionData.userDetails}});
    }
    else if(actionData?.errors){
      toast.error(actionData.errors.message || "Login failed");
    }
  },[actionData]);

  return (
    <div className='sign-in-div'>
      <Form method="POST" className="sign-in-form">
        <p className="sign-in-form-title">Sign in to your account</p>
        <div className="sign-in-input-container">
          <input type="text" placeholder="Enter Username" name="username" />
          <span>
          </span>
        </div>
        <div className="sign-in-input-container">
          <input type="password" placeholder="Enter password" name="password" />
        </div>
        <button type="submit" disabled={isSubmitting} className="sign-in-submit">
          {isSubmitting?"Authentication":"Login"}
        </button>
        <p className="signup-link">
          No account? 
          <Link to="/register">Register</Link>
        </p>
      </Form> 
    </div>
  )
}

export async function loginAction({request}) {
  const data = await request.formData(); 

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try{
    const response = await apiClient.post("/auth/login", loginData);
    const { message, role, userDetails} = response.data;
    localStorage.setItem("user", JSON.stringify(response.data));
    if(role === "PATIENT"){
      return { success: true, redirectTo:"/patient", userDetails }
    }
    else if(role === "DOCTOR"){
      return { success: true, redirectTo:"/doctor", userDetails }
    }
    else if(role === "RECEPTIONIST"){
      return { success: true, redirectTo:"/receptionist", userDetails }
    }
    else if(role === "ADMIN"){
      return { success: true, redirectTo:"/admin", userDetails }
    }
  }
  catch(error){
    if(error.response?.status === 401){
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
      error.message ||
      "Failed to login. Please try again.",
      {status: error.response?.status || 500}
    );
  }

}