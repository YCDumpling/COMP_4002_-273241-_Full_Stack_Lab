import './AddForm.css';
import type { FormEvent } from 'react';

type AddFormProps = {
  departmentOptions: string[];
  inputLabel?: string;
  textValue: string;
  onTextChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  errors?: { name?: string; department?: string; role?: string };
  onSubmit: () => Promise<boolean> | boolean;
  isSubmitting?: boolean;
};

function AddForm({
  departmentOptions,
  inputLabel = '',
  textValue,
  onTextChange,
  selectedDepartment,
  onDepartmentChange,
  errors = {},
  onSubmit,
  isSubmitting = false,
}: AddFormProps) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <div className="add-form">
      <h3>Add New</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>{inputLabel}</label>
          <input
            type="text"
            value={textValue}
            onChange={(e) => onTextChange(e.currentTarget.value)}
            placeholder="Enter Name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>

        <div className="form-field">
          <label>Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.currentTarget.value)}
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((departmentName) => (
              <option key={departmentName} value={departmentName}>
                {departmentName}
              </option>
            ))}
          </select>
          {errors.department && (
            <div className="error-message">{errors.department}</div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add New'}
        </button>
      </form>
    </div>
  );
}

export default AddForm;