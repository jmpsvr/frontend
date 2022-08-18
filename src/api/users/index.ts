import {
  UserParams,
  UserListGetResultModel,
  RoleParams,
  RoleListGetResultModel,
  RolePageParams,
  RolePageListGetResultModel,
  UserInfo,
  MenuParams,
  MenuListGetResultModel,
  RoleInfo,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/user/getUserList',
  IsUserExist = '/user/userExist',
  SetUserStatus = '/user/setUserStatus',
  SetUserInfo = '/user/setUserInfo',
  RolePageList = '/user/getRoleListByPage',
  GetAllRoleList = '/user/getAllRoleList',
  MenuList = '/user/getMenuList',
  RoleInfo = '/user/setRoleInfo',
  DeleteUser = '/user/deleteUser',
  DeleteRole = '/user/deleteRole',
}

export const getUserList = (params: UserParams) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const setUserStatus = (id: number, status: boolean) =>
  defHttp.post({ url: Api.SetUserStatus, params: { id, status } });

export const setUserInfo = (params: UserInfo) => defHttp.post({ url: Api.SetUserInfo, params });

export const isUserExist = (user: string) =>
  defHttp.post({ url: Api.IsUserExist, params: { user } }, { errorMessageMode: 'none' });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const setRoleInfo = (params: RoleInfo) => defHttp.post({ url: Api.RoleInfo, params });

export const deleteUser = (id: number) => defHttp.post({ url: Api.DeleteUser, params: { id } });

export const deleteRole = (name: string) => defHttp.post({ url: Api.DeleteRole, params: { name } });
