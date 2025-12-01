export type EmployeeDirectoryMap = Record<string, string[]>;

let employeeDirectoryCache: EmployeeDirectoryMap | null = null;
const EMPLOYEE_DATA_URL = '/data/employees.json';

async function ensureEmployeeDirectoryLoaded(): Promise<EmployeeDirectoryMap> {
  if (employeeDirectoryCache) {
    return employeeDirectoryCache;
  }
  try {
    const response = await fetch(EMPLOYEE_DATA_URL);
    const data = (await response.json()) as EmployeeDirectoryMap;
    employeeDirectoryCache = data ?? {};
  } catch {
    employeeDirectoryCache = {};
  }
  return employeeDirectoryCache;
}

export async function getEmployeeDirectory(): Promise<EmployeeDirectoryMap> {
  return ensureEmployeeDirectoryLoaded();
}

export async function getEmployeeDepartments(): Promise<string[]> {
  const directory = await ensureEmployeeDirectoryLoaded();
  return Object.keys(directory);
}

export async function getEmployeesByDepartment(departmentName: string): Promise<string[]> {
  const directory = await ensureEmployeeDirectoryLoaded();
  return directory[departmentName] ?? [];
}

export async function addEmployee(departmentName: string, employeeName: string): Promise<EmployeeDirectoryMap> {
  const directory = await ensureEmployeeDirectoryLoaded();
  const list = directory[departmentName] ?? [];
  directory[departmentName] = [...list, employeeName];
  employeeDirectoryCache = { ...directory };
  return employeeDirectoryCache;
}
