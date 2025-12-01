import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AddForm from '../form/AddForm';
import { getRoleDirectory } from '../../repositories/roleRepository';
import useEntryForm from '../../hooks/useEntryForm';

type RoleDirectoryMap = Record<string, string[]>;

export function OrganizationDirectoryComponent() {
  const [roleDirectory, setRoleDirectory] = useState<RoleDirectoryMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDepartmentMap, setExpandedDepartmentMap] = useState<Record<string, boolean>>({});
  const [searchParams] = useSearchParams();
  const departmentFilter = searchParams.get('value');

  const form = useEntryForm('role');

  useEffect(() => {
    (async () => {
      const data = await getRoleDirectory();
      setRoleDirectory(data);
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    const ok = await form.submit();
    if (ok) {
      const data = await getRoleDirectory();
      setRoleDirectory(data);
    }
    return ok;
  };

  const allDepartments = Object.keys(roleDirectory);
  const visibleDepartments = departmentFilter ? [departmentFilter] : allDepartments;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="organization-directory">
      {visibleDepartments.map((departmentName) => {
        const roles = roleDirectory[departmentName] ?? [];
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
                {roles.map((roleName) => (
                  <li key={roleName}>{roleName}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <AddForm
        departmentOptions={form.departmentOptions}
        inputLabel="Role Name:"
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

export default OrganizationDirectoryComponent;