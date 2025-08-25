import apiClient from "../../api/apiClient";

export async function staffRegister({request, params}) {
  const data = await request.formData();
  const userData = {
    username: data.get("username"),
    password: data.get("password")
  }
  const staffData = {
    name : data.get("fullName"),
    dob: data.get("dob"),
    gender: data.get("gender"),
    address: data.get("address"),
    designation: data.get("designation"),
    contactNo: data.get("contactNo"),
    user: userData
  }
  try{
    const response = await apiClient.post("staff/register",staffData)
    return {
      success:"true",
      message: response.data.message
    };
  }
  catch(error){
    throw new Response(
      error.message || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}