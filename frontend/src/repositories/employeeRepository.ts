export type EmployeeDirectoryMap = Record<string, string[]>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function getEmployeeDirectory(token?: string): Promise<EmployeeDirectoryMap> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/employees`, { headers });
    if (!response.ok) throw new Error('Failed to fetch employees');
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    return {};
  }
}

export async function getEmployeeDepartments(token?: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/employees/departments`, { headers });
    if (!response.ok) throw new Error('Failed to fetch departments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export async function getEmployeesByDepartment(departmentName: string, token?: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/employees/department/${encodeURIComponent(departmentName)}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch employees by department');
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees by department:', error);
    return [];
  }
}

export async function addEmployee(departmentName: string, employeeName: string, token?: string): Promise<EmployeeDirectoryMap> {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ department: departmentName, name: employeeName })
    });
    if (!response.ok) throw new Error('Failed to add employee');
    return await response.json();
  } catch (error) {
    console.error('Error adding employee:', error);
    return {};
  }
}
