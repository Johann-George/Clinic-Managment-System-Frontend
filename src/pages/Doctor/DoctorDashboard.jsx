import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

function DoctorDashboard() {
  //React Router hooks
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //Form refs
  const validateFormRef = useRef(null);
  const consultationFormRef = useRef(null);
  const historyFormRef = useRef(null);

  //To switch between validate appointment no and conduct consultation
  const [valid, setValid] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  //state for medicine rows
  const [rows, setRows] = useState([
    { medicine: "", dosage: "", frequency: "", duration: "" },
  ]);

  //state for lab tests
  const [labTests, setLabTests] = useState([{ testName: "" }]);

  //Handle action data responses
  useEffect(() => {
    if(actionData){
      if(actionData.type === 'validate' && actionData.success){
        setValid(true);
        setAppointmentId(actionData.appointmentId);
        toast.success(actionData.message);
        validateFormRef.current?.reset();
      }

      if(actionData.type==='consultation' && actionData.success){
        toast.success("Consultation completed successfully");
        setValid(false);
        setAppointmentId(null);
        setRows([{medicine:'',dosage:'',frequency:'',duration:''}]);
        setLabTests([{testName:''}]);
        toast.success(actionData.message);
        consultationFormRef.current?.reset();
      }

      if(!actionData.success){
        toast.error(actionData.message || "Operation failed!");
      }
    }
  },[actionData]);

  const addRow = () => {
    setRows([
      ...rows,
      { medicine: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const addLabTestRow = () => {
    setLabTests([...labTests, { testName: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const removeLabTestRow = (index) => {
    setLabTests(labTests.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleLabTestChange = (index, value) => {
    const updatedTests = [...labTests];
    updatedTests[index].testName = value;
    setLabTests(updatedTests);
  };

  return (
    <>
      <PageTitle title="Doctor Dashboard" />
      <div className='container mt-5 mb-5'>
        {!valid && (
          <Form method="POST" ref={validateFormRef} className="row g-3">
            <h4>Validate Appointment</h4>
            <input type="hidden" name="actionType" value="validate"/>
            <div className="col-md-7">
              <label htmlFor="validationDefault02" className="form-label">
                Appointment Number
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  name="tokenNo"
                  required
                />
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting? 'Validating':'Submit'}
                </button>
              </div>
            </div>
          </Form>
        )}

        {valid && (
          <Form method="POST" ref={consultationFormRef} className="row g-3">
            <h4>Conduct Consultation</h4>
            <input type="hidden" name="actionType" value="consultation"/>
            <input type="hidden" name="appointmentId" value={appointmentId} />
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="validationDefault01" className="form-label">
                  Patient Username
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroupPrepend2">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    name="patientUsername"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="validationDefault02" className="form-label">
                  Diagnosis Details
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  name="diagnosisDetails"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {rows.map((row,index) => (
              <div key={'medicine-hidden-${index}'}>
                <input type="hidden" name={`medicines[${index}].medicineName`} value={row.medicine} />
                <input type="hidden" name={`medicines[${index}].dosage`} value={row.dosage} />
                <input type="hidden" name={`medicines[${index}].frequency`} value={row.frequency} />
                <input type="hidden" name={`medicines[${index}].duration`} value={row.duration} />
              </div>
            ))}

            {labTests.map((test,index)=>(
              <input key={`test-hidden-${index}`} type="hidden" name={`labTests[${index}].labTestName`} value={test.testName} />
            ))}

            {rows.map((row, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-3">
                  {index === 0 && (
                    <label className="form-label">Prescribe Medicine</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    value={row.medicine}
                    onChange={(e) =>
                      handleChange(index, "medicine", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-md-2">
                  {index === 0 && <label className="form-label">Dosage</label>}
                  <input
                    type="number"
                    className="form-control"
                    value={row.dosage}
                    onChange={(e) =>
                      handleChange(index, "dosage", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-md-2">
                  {index === 0 && <label className="form-label">Frequency</label>}
                  <input
                    type="number"
                    className="form-control"
                    value={row.frequency}
                    onChange={(e) =>
                      handleChange(index, "frequency", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-md-2">
                  {index === 0 && <label className="form-label">Duration</label>}
                  <input
                    type="number"
                    className="form-control"
                    value={row.duration}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-md-1 d-flex align-items-end">
                  {index === rows.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={addRow}
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  )}
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeRow(index)}
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {labTests.map((test, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-3">
                  {index === 0 && (
                    <label className="form-label">Prescribe Lab Test</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    value={test.testName}
                    onChange={(e) => handleLabTestChange(index, e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="col-md-1 d-flex align-items-end gap-2">
                  {index === labTests.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addLabTestRow}
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  )}

                  {labTests.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeLabTestRow(index)}
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="col-12 ">
              <button className="btn btn-primary" type="submit">
                {isSubmitting ? 'Submitting':'Submit'}
              </button>
            </div>
          </Form>
        )}

      </div>

      <div className="container mt-5 mb-5">
        <Form method="GET" ref={historyFormRef} className="row g-3">
          <h4>View Patient History</h4>
          <input type="hidden" name="actionType" value="history"/>
          <div className="row">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend2">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Patient Username"
                  id="validationDefaultUsername"
                  aria-describedby="inputGroupPrepend2"
                  required
                  disabled={isSubmitting}
                />
                <button className="btn btn-primary" type="submit">
                  {isSubmitting?'Loading':'View'}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default DoctorDashboard;