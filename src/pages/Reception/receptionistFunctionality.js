import apiClient from "../../api/apiClient";

export async function patientRegister(data) {
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
    const response = await apiClient.post("patient/register",patientData);
    return {
        type: 'register',
        success:true,
        message: response.data.message
    };
  }
  catch(error){
    throw new Response(
      error.response?.data?.error || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function bookAppointment(data) {
  const appointmentData = {
    doctorUsername: data.get("doctorUsername"),
    patientUsername: data.get("patientUsername"),
    appointmentDate: data.get("appointmentDate"),
    appointmentTime: data.get("appointmentTime")
  };
  try{
    const response = await apiClient.post("/appointment/book",appointmentData);
    return {
        type: 'book',
        success: true,
        message: response.data.message,
        tokenNo: response.data.tokenNo
    }
  }
  catch(error){
    if(error.status === 400){
        return {
            success : false,
            errors: error.response?.data
        }
    }
    throw new Response(
      error.response?.data?.error || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function receptionistDashboardAction({request}) {
    const formData = await request.formData();
    const actionType = formData.get('actionType');
    switch(actionType){
        case 'register':
            return patientRegister(formData);
        case 'book':
            return bookAppointment(formData);
        default:
            return {
                success: false,
                message: 'Invalid action type'
            };
    }
}