export type RoleDirectoryMap = Record<string, string[]>;

let roleDirectoryCache: RoleDirectoryMap | null = null;
const ROLE_DATA_URL = '/data/leadershipAndManagement.json';

async function ensureRoleDirectoryLoaded(): Promise<RoleDirectoryMap> {
  if (roleDirectoryCache) {
    return roleDirectoryCache;
  }
  try {
    const response = await fetch(ROLE_DATA_URL);
    const data = (await response.json()) as RoleDirectoryMap;
    roleDirectoryCache = data ?? {};
  } catch {
    roleDirectoryCache = {};
  }
  return roleDirectoryCache;
}

export async function getRoleDirectory(): Promise<RoleDirectoryMap> {
  return ensureRoleDirectoryLoaded();
}

export async function getRoleDepartments(): Promise<string[]> {
  const directory = await ensureRoleDirectoryLoaded();
  return Object.keys(directory);
}

export async function getRolesByDepartment(departmentName: string): Promise<string[]> {
  const directory = await ensureRoleDirectoryLoaded();
  return directory[departmentName] ?? [];
}

export async function addRole(departmentName: string, roleName: string): Promise<RoleDirectoryMap> {
  const directory = await ensureRoleDirectoryLoaded();
  const list = directory[departmentName] ?? [];
  directory[departmentName] = [...list, roleName];
  roleDirectoryCache = { ...directory };
  return roleDirectoryCache;
}
