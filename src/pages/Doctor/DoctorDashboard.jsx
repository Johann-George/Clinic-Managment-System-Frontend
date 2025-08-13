import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function DoctorDashboard() {
  const [rows, setRows] = useState([
    { medicine: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [labTests, setLabTests] = useState([{ testName: "" }]);

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
      <div className="container mt-5 mb-5">
        <form className="row g-3">
          <h4>Conduct Consultation</h4>
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
                  required
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
                required
              />
            </div>
          </div>
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
                />
              </div>

              <div className="col-md-1 d-flex align-items-end">
                {index === rows.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addRow}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
                {rows.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeRow(index)}
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
                />
              </div>

              <div className="col-md-1 d-flex align-items-end gap-2">
                {index === labTests.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addLabTestRow}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}

                {labTests.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeLabTestRow(index)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </div>
            </div>
          ))}
          

          <div className="col-12 ">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>

          <h4>View Patient History</h4>
          <div className="col-md-4">
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
              />
              <button type="submit" className="btn btn-primary ">
                View
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DoctorDashboard;
