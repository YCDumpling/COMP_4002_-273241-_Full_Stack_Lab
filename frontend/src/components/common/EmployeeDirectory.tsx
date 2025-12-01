import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import AddForm from '../form/AddForm';
import { getEmployeeDirectory } from '../../repositories/employeeRepository';
import useEntryForm from '../../hooks/useEntryForm';

type EmployeeDirectoryMap = Record<string, string[]>;

export function EmployeeDirectoryComponent() {
  const [employeeDirectory, setEmployeeDirectory] = useState<EmployeeDirectoryMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDepartmentMap, setExpandedDepartmentMap] = useState<Record<string, boolean>>({});
  const [searchParams] = useSearchParams();
  const departmentFilter = searchParams.get('value');
  const { getToken } = useAuth();

  const form = useEntryForm('employee');

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const data = await getEmployeeDirectory(token || undefined);
      setEmployeeDirectory(data);
      setIsLoading(false);
    })();
  }, [getToken]);

  const handleSubmit = async () => {
    const ok = await form.submit();
    if (ok) {
      const token = await getToken();
      const data = await getEmployeeDirectory(token || undefined);
      setEmployeeDirectory(data);
    }
    return ok;
  };

  // Always compute these values before any return so hook order is stable.
  const allDepartments = Object.keys(employeeDirectory);
  const visibleDepartments = departmentFilter ? [departmentFilter] : allDepartments;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="employee-directory">
      {visibleDepartments.map((departmentName) => {
        const employees = employeeDirectory[departmentName] ?? [];
        return (
          <div key={departmentName}>
            <h4
              onClick={() =>
                setExpandedDepartmentMap((prev) => ({
                  ...prev,
                  [departmentName]: !prev[departmentName],
                }))
              }
            >
              {departmentName}
            </h4>
            {expandedDepartmentMap[departmentName] && (
              <ul>
                {employees.map((employeeName) => (
                  <li key={employeeName}>{employeeName}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <AddForm
        departmentOptions={form.departmentOptions}
        inputLabel="Employee Name:"
        textValue={form.textValue}
        onTextChange={form.setTextValue}
        selectedDepartment={form.selectedDepartment}
        onDepartmentChange={form.setSelectedDepartment}
        errors={form.errors}
        onSubmit={handleSubmit}
        isSubmitting={form.isSubmitting}
      />
    </section>
  );
}

export default EmployeeDirectoryComponent;