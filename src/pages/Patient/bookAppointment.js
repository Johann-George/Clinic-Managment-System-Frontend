import apiClient from "../../api/apiClient";

export async function bookAppointment({request, params}) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userDetails = userData?.userDetails;
    if (!userDetails && !userDetails.patientId) {
      throw new Response("Patient details missing from localStorage", { status: 400 });
    }
  const data = await request.formData();
  console.log("Doctor Username:"+data.get("appointmentDate"));
    console.log(userDetails.patientId);
//   console.log("Patient Id:"+data.get("doctorUsername"));
//   console.log("Doctor Username:"+data.get("doctorUsername"));
  const appointmentData = {
    doctorUsername: data.get("doctorUsername"),
    patientId: userDetails.patientId,
    appointmentDate: data.get("appointmentDate"),
    appointmentTime: data.get("appointmentTime")
  };
  try{
    await apiClient.post("/appointment/book",appointmentData)
    return {success:"true"};
  }
  catch(error){
    throw new Response(
      error.response?.data?.error || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}