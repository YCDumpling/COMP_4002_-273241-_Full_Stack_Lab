import { getRolesByDepartment } from '../repositories/roleRepository.ts';

export type ValidationResult = {
  isValid: boolean;
  messages: {
    name?: string;
    department?: string;
    role?: string;
  };
};

export async function validateEmployee(nameValue: string, departmentName: string): Promise<ValidationResult> {
  const messages: ValidationResult['messages'] = {};
  if (!nameValue || nameValue.trim().length < 3) {
    messages.name = 'Name must be at least three characters';
  }
  if (!departmentName) {
    messages.department = 'Please select a department';
  }
  return { isValid: Object.keys(messages).length === 0, messages };
}

export async function validateRole(roleName: string, departmentName: string): Promise<ValidationResult> {
  const messages: ValidationResult['messages'] = {};
  if (!roleName || roleName.trim().length < 3) {
    messages.role = 'Role name must be at least three characters';
  }
  if (!departmentName) {
    messages.department = 'Please select a department';
  }
  if (!messages.role && !messages.department) {
    const roles = await getRolesByDepartment(departmentName);
    const exists = roles
      .map((role: string) => role.toLowerCase().trim())
      .includes(roleName.toLowerCase().trim());
    if (exists) {
      messages.role = 'This role is already filled';
    }
  }
  return { isValid: Object.keys(messages).length === 0, messages };
}

export const validStaffService = {
  validateEmployee,
  validateRole,
};
