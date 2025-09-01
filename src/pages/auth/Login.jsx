import React, { useEffect, useState } from 'react'
import { Form, Link, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/auth-context';

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const {loginSuccess} = useAuth();
  const from = sessionStorage.getItem("redirectPath") || "/home";
  
  useEffect(()=>{
    if(actionData?.success){
      loginSuccess(actionData.jwtToken,actionData.user)
      sessionStorage.removeItem("redirectPath");
      navigate(actionData.redirectPath);
      toast.success("Logged In successfully");
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
    password: data.get("password")
  };

  try{
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken} = response.data;
    //localStorage.setItem("user", JSON.stringify(response.data));
    if(user.role === "ROLE_PATIENT"){
      return { success: true, redirectPath:"/patient", message, user, jwtToken }
    }
    else if(user.role === "ROLE_DOCTOR"){
      return { success: true, redirectPath:"/doctor", message, user, jwtToken }
    }
    else if(user.role === "ROLE_RECEPTIONIST"){
      return { success: true, redirectPath:"/receptionist", message, user, jwtToken }
    }
    else if(user.role === "ROLE_ADMIN"){
      return { success: true, redirectPath:"/admin", message, user, jwtToken }
    }
  }
  catch(error){
    if(error.response?.status === 401){
      return {
        success: false,
        errors: { message: error.response?.data?.message },
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