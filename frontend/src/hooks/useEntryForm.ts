import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
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
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const departments = entryMode === 'employee' 
        ? await getEmployeeDepartments(token || undefined) 
        : await getRoleDepartments(token || undefined);
      setDepartmentOptions(departments);
    })();
  }, [entryMode, getToken]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result =
        entryMode === 'employee'
          ? await validStaffService.validateEmployee(textValue, selectedDepartment)
          : await validStaffService.validateRole(textValue, selectedDepartment);
      setErrors(result.messages);
      if (!result.isValid) return false;
      const token = await getToken();
      if (entryMode === 'employee') {
        await addEmployee(selectedDepartment, textValue, token || undefined);
      } else {
        await addRole(selectedDepartment, textValue, token || undefined);
      }
      setTextValue('');
      setSelectedDepartment('');
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [entryMode, textValue, selectedDepartment, getToken]);

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
