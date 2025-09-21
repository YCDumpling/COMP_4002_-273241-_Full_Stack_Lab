import { useState } from 'react';
import './AddForm.css';

function AddForm({ 
  departments, 
  onAddItem, 
  inputLabel = ""
}) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleDepartmentChange = (department: string) => {
    setDepartment(department);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (name.length < 3) {
      setNameError('Must be at least 3 characters');
      return;
    }
    
    if (!department) {
      setNameError('Please select a department');
      return;
    }

    // clear form
    setNameError('');
    setName('');
    setDepartment('');
    setNameError('');
    // add the new item into the directory
    onAddItem(department, name);
  };

  return (
    <div className="add-form">
      <h3>Add New</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>{inputLabel}</label>
          <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Enter Name"/>
          {/* display error if validation did not pass */}
          {nameError && <div className="error-message">{nameError}</div>}
        </div>

        <div className="form-field">
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button  type="submit" > Add New</button>
      </form>
    </div>
  );
}

export default AddForm;