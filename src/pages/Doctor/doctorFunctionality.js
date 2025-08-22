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

export async function conductConsultationAction({request}) {
    const formData = await request.formData();
    
    const appointmentId = formData.get('appointmentId');
    const patientUsername = formData.get('patientUsername');
    const diagnosisDetails = formData.get('diagnosisDetails');

    const medicines = [];
    let medicineIndex = 0;
    while(formData.get(`medicines[${medicineIndex}].medicine`)) {
        const medicine = formData.get(`medicines[${medicineIndex}].medicine`);
        const dosage = formData.get(`medicines[${medicineIndex}].dosage`);
        const frequency = formData.get(`medicines[${medicineIndex}].frequency`);
        const duration = formData.get(`medicines[${medicineIndex}].duration`);

        if(medicine && medicine.trim() !== ''){
            medicines.push({
                medicine,
                dosage: dosage,
                frequency: frequency,
                duration: duration
            });
        }
        medicineIndex++;
    }

    const labTests = [];
    let testIndex = 0;
    while(formData.get(`labTests[${testIndex}].testName`)){
        const testName = formData.get(`labTests[${testIndex}].testName`);
        if(testName && testName.trim() !== ''){
            labTests.push({testName});
        }
        testIndex++;
    }

    const consultationData = {
        appointmentId: appointmentId,
        patientUsername,
        diagnosisDetails,
        prescriptions: medicines,
        labTests: labTests
    };
    try{
        const response = await apiClient.post('/consultation/add', consultationData);
        return {
            type: 'consultation',
            success: true,
            data: response.data,
            message: 'Consultation completed successfully'
        };
    }
    catch(error){
        return{
            type: 'consultation',
            success: false,
            message: error.response?.data?.message || 'Failed to conduct consultation'
        };
    }
}

export async function doctorDashboardAction({request}) {
    const formData = await request.formData();
    const actionType = formData.get('actionType');
    switch(actionType){
        case 'validate':
            return validateAppointmentAction(formData);
        case 'consultation':
            return conductConsultationAction({request});
        case 'history':
            return patientHistoryLoader({request});
        default:
            return {
                success: false,
                message: 'Invalid action type'
            };
    }
}