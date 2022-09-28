interface LoginParams {
  username: string;
  password: string;
}

interface RoleInfo {
  roleName: string;
  value: string;
}

interface LoginResult {
  userId: string | number;
  token: string;
  refreshToken: string;
  role: RoleInfo;
}

interface UserInfo {
  id?: number;
  name?: string;
  avatar?: string;
  role?: string;
}
