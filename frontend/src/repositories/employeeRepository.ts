export type EmployeeDirectoryMap = Record<string, string[]>;

const API_BASE_URL = 'http://localhost:3000/api';

export async function getEmployeeDirectory(): Promise<EmployeeDirectoryMap> {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    return {};
  }
}

export async function getEmployeeDepartments(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export async function getEmployeesByDepartment(departmentName: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/department/${encodeURIComponent(departmentName)}`);
    if (!response.ok) throw new Error('Failed to fetch employees by department');
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees by department:', error);
    return [];
  }
}

export async function addEmployee(departmentName: string, employeeName: string): Promise<EmployeeDirectoryMap> {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: departmentName, name: employeeName })
    });
    if (!response.ok) throw new Error('Failed to add employee');
    return await response.json();
  } catch (error) {
    console.error('Error adding employee:', error);
    return {};
  }
}
