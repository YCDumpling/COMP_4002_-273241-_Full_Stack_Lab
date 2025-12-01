import { useCallback, useEffect, useState } from 'react';
import { getEmployeeDepartments, addEmployee } from '../repositories/employeeRepository.ts';
import { getRoleDepartments, addRole } from '../repositories/roleRepository.ts';
import { validStaffService } from '../services/validStaffService.ts';

type EntryMode = 'employee' | 'role';

export function useEntryForm(entryMode: EntryMode) {
  const [textValue, setTextValue] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; department?: string; role?: string }>({});
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const departments = entryMode === 'employee' ? await getEmployeeDepartments() : await getRoleDepartments();
      setDepartmentOptions(departments);
    })();
  }, [entryMode]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result =
        entryMode === 'employee'
          ? await validStaffService.validateEmployee(textValue, selectedDepartment)
          : await validStaffService.validateRole(textValue, selectedDepartment);
      setErrors(result.messages);
      if (!result.isValid) return false;
      if (entryMode === 'employee') {
        await addEmployee(selectedDepartment, textValue);
      } else {
        await addRole(selectedDepartment, textValue);
      }
      setTextValue('');
      setSelectedDepartment('');
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [entryMode, textValue, selectedDepartment]);

  return {
    textValue,
    setTextValue,
    selectedDepartment,
    setSelectedDepartment,
    errors,
    departmentOptions,
    isSubmitting,
    submit,
  } as const;
}

export default useEntryForm;
