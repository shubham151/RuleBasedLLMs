import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HandleRules({ formik }) {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleAddField = () => {
    const newFields = [...inputFields, { value: "" }];
    setInputFields(newFields);
    formik.setFieldValue("rules", newFields.map(field => field.value));
  };

  const handleRemoveField = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
    formik.setFieldValue("rules", fields.map(field => field.value));
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
    formik.setFieldValue("rules", values.map(field => field.value));
  };

  return (
    <div>
      {inputFields.map((inputField, index) => (
        <div key={index} className="d-flex justify-content-center align-items-center mb-2">
          <input
            type="text"
            name={`rules[${index}]`}
            onChange={(event) => handleChangeInput(index, event)}
            value={inputField.value}
            placeholder="Enter your rules"
            className="form-control bg-dark text-white me-2"
            style={{ flex: '0 0 70%'}} 
            
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleRemoveField(index)}
          >
            -
          </button>
        </div>
      ))}
      <div className="p-2">
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleAddField}
        >
          + Add Rules
        </button>
      </div>
    </div>
  );
}

export default HandleRules;
