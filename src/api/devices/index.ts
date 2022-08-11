import {
  DeviceParams,
  DeviceId,
  DeviceListGetResultModel,
  AreaListItem,
  AreaListGetResultModel,
  DeviceDetail,
  MQCmdParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  DeviceList = '/device/getDeviceList',
  AreaList = '/device/getAreaList',
  TypeList = '/device/getTypeList',
  SetDeviceInfo = '/device/setDeviceInfo',
  DeviceDetail = '/device/getDeviceDetail',
  MQCmd = '/device/sendMQCmd',
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
