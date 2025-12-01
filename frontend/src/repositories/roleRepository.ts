export type RoleDirectoryMap = Record<string, string[]>;

const API_BASE_URL = 'http://localhost:3000/api';

export async function getRoleDirectory(token?: string): Promise<RoleDirectoryMap> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/roles`, { headers });
    if (!response.ok) throw new Error('Failed to fetch roles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    return {};
  }
}

export async function getRoleDepartments(token?: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/roles/departments`, { headers });
    if (!response.ok) throw new Error('Failed to fetch departments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
}

export async function getRolesByDepartment(departmentName: string, token?: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/roles/department/${encodeURIComponent(departmentName)}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch roles by department');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles by department:', error);
    return [];
  }
}

export async function addRole(departmentName: string, roleName: string, token?: string): Promise<RoleDirectoryMap> {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ department: departmentName, name: roleName })
    });
    if (!response.ok) throw new Error('Failed to add role');
    return await response.json();
  } catch (error) {
    console.error('Error adding role:', error);
    return {};
  }
}
