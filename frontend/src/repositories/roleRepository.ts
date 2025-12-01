export type RoleDirectoryMap = Record<string, string[]>;

const API_BASE_URL = 'http://localhost:3000/api';

export async function getRoleDirectory(): Promise<RoleDirectoryMap> {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`);
    if (!response.ok) throw new Error('Failed to fetch roles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    return {};
  }
}

export async function getRoleDepartments(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export async function getRolesByDepartment(departmentName: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/department/${encodeURIComponent(departmentName)}`);
    if (!response.ok) throw new Error('Failed to fetch roles by department');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles by department:', error);
    return [];
  }
}

export async function addRole(departmentName: string, roleName: string): Promise<RoleDirectoryMap> {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: departmentName, name: roleName })
    });
    if (!response.ok) throw new Error('Failed to add role');
    return await response.json();
  } catch (error) {
    console.error('Error adding role:', error);
    return {};
  }
}
