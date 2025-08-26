import apiClient from "../../api/apiClient";

export async function validateAppointmentAction(formData) {

    try{
        const response = await apiClient.post("/consultation/validate",{
            tokenNo:formData.get('tokenNo')
        });

        return {
            type: 'validate',
            success: true,
            appointmentId: response.data.appointmentId,
            message: response.data.message
        };
    }
    catch(error){
        return {
            type: 'validate',
            success: false,
            message: error.response?.data?.message
        };
    }
}

export async function conductConsultationAction(formData) {
    console.log([...formData.entries()]);
    
    const appointmentId = formData.get('appointmentId');
    const patientUsername = formData.get('patientUsername');
    const diagnosisDetails = formData.get('diagnosisDetails');

    const medicines = [];
    let medicineIndex = 0;
    while(formData.get(`medicines[${medicineIndex}].medicineName`)) {
        const medicineName = formData.get(`medicines[${medicineIndex}].medicineName`);
        const dosage = formData.get(`medicines[${medicineIndex}].dosage`);
        const frequency = formData.get(`medicines[${medicineIndex}].frequency`);
        const duration = formData.get(`medicines[${medicineIndex}].duration`);

        if(medicineName && medicineName.trim() !== ''){
            medicines.push({
                medicineName,
                dosage: dosage,
                frequency: frequency,
                duration: duration
            });
        }
        medicineIndex++;
    }

    const labTests = [];
    let testIndex = 0;
    while(formData.get(`labTests[${testIndex}].labTestName`)){
        const labTestName = formData.get(`labTests[${testIndex}].labTestName`);
        if(labTestName && labTestName.trim() !== ''){
            labTests.push({labTestName});
        }
        testIndex++;
    }

    const consultationData = {
        appointmentId: appointmentId,
        patientUsername,
        diagnosisDetails,
        prescribedMedicines: medicines,
        prescribedLabTests: labTests
    };
    console.log(JSON.stringify(consultationData, null, 2));
    try{
        const response = await apiClient.post('/consultation/add', consultationData);
        return {
            type: 'consultation',
            success: true,
            message: response.data.message
        };
    }
    catch(error){
        if(error.status === 400){
            return {
                success : false,
                errors: error.response?.data
            }
        }
        throw new Response(
            error.response?.data?.error || "Failed to conduct consultation. Please try again.",
            { status: error.status || 500 }
        );
    }
}

export async function doctorDashboardAction({request}) {
    const formData = await request.formData();
    const actionType = formData.get('actionType');
    switch(actionType){
        case 'validate':
            return validateAppointmentAction(formData);
        case 'consultation':
            return conductConsultationAction(formData);
        case 'history':
            return patientHistoryLoader(formData);
        default:
            return {
                success: false,
                message: 'Invalid action type'
            };
    }
}