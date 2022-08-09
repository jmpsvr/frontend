/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  name: string;
  remark: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  id: number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  id: number;
  username: string;
  nickname: string;
  createTime: string;
  remark: string;
}
