import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type UserParams = BasicPageParams & {
  name?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface UserInfo {
  id: number;
  name: string;
  role: string;
  nickname: string;
  password: string;
  status: boolean;
  email: string;
  remark: string;
}

export interface RoleInfo {
  name: string;
  permission: JSON;
  remark: string;
}

export interface UserListItem {
  id: number;
  name: string;
  role: string;
  createTime: string;
  status: boolean;
  email: string;
  remark: string;
}

export interface RoleListItem {
  name: string;
  remark: string;
  grant: Object;
  createTime: string;
}

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

/**
 * @description: Request list return value
 */
export type UserListGetResultModel = BasicFetchResult<UserListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
