import apiClient from "../../api/apiClient";

export async function bookAppointment({request}) {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData && !userData.name) {
    throw new Response("Patient details missing from localStorage", { status: 400 });
  }
  const data = await request.formData();
  const appointmentData = {
    doctorUsername: data.get("doctorUsername"),
    patientUsername: userData.name,
    appointmentDate: data.get("appointmentDate"),
    appointmentTime: data.get("appointmentTime")
  };
  try{
    await apiClient.post("/appointment/book",appointmentData)
      .then(response => {
        alert(`Your Token Number is ${response.data.tokenNo}`);
      })
  }
  catch(error){
    throw new Response(
      error.response?.data?.error || "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}