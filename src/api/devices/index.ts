import {
  DeviceParams,
  DeviceId,
  DeviceListGetResultModel,
  AreaListItem,
  AreaListGetResultModel,
  DeviceDetail,
  MQCmdParams,
  ActionListItem,
  ActionListGetResultModel,
  NoticeListItem,
  NoticeListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  DeviceList = '/device/getDeviceList',
  AreaList = '/device/getAreaList',
  TypeList = '/device/getTypeList',
  SetDeviceInfo = '/device/setDeviceInfo',
  DeviceDetail = '/device/getDeviceDetail',
  MQCmd = '/device/sendMQCmd',
  ActionList = '/device/getActionList',
  SetActionInfo = '/device/setActionInfo',
  NoticeList = '/device/getNoticeList',
  DeleteDevice = '/device/deleteDevice',
  SetArea = '/device/setArea',
  DeleteArea = '/device/deleteArea',
  DeleteAction = '/device/deleteAction',
}

export const getDeviceList = (params: DeviceParams) =>
  defHttp.get<DeviceListGetResultModel>({ url: Api.DeviceList, params });

export const getAreaList = (params?: AreaListItem) =>
  defHttp.get<AreaListGetResultModel>({ url: Api.AreaList, params });

export const getTypeList = () => defHttp.get<Array<string>>({ url: Api.TypeList });

export const setDeviceInfo = (params: DeviceParams) =>
  defHttp.post({ url: Api.SetDeviceInfo, params });

export const getDeviceDetail = (params: DeviceId) =>
  defHttp.get<DeviceDetail>({ url: Api.DeviceDetail, params });

export const sendMQCmd = (params: MQCmdParams) => defHttp.post({ url: Api.MQCmd, params });

export const getActionList = (params?: ActionListItem) =>
  defHttp.get<ActionListGetResultModel>({ url: Api.ActionList, params });

export const setActionInfo = (params?: ActionListItem) =>
  defHttp.post({ url: Api.SetActionInfo, params });

export const getNoticeList = (params?: NoticeListItem) =>
  defHttp.get<NoticeListGetResultModel>({ url: Api.NoticeList, params });

export const deleteDevice = (id: number) => defHttp.post({ url: Api.DeleteDevice, params: { id } });

export const setArea = (params: AreaListItem) => defHttp.post({ url: Api.SetArea, params });

export const deleteArea = (id: number) => defHttp.post({ url: Api.DeleteArea, params: { id } });

export const deleteAction = (id: number) => defHttp.post({ url: Api.DeleteAction, params: { id } });
