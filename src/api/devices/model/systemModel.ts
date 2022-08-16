import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type DeviceParams = BasicPageParams & {
  mac?: string;
  name?: string;
  remark?: string;
  type?: number;
  area?: number;
  conn?: Object;
};

export type DeviceId = {
  id: number;
};

export type AreaParams = {
  id?: number;
  name?: string;
  remark?: string;
};

export type MQCmdParams = {
  id: number;
  cmd: string;
};

export interface DeviceListItem {
  mac: string;
  name: string;
  conn: Object;
  area: number;
  type: number;
  createTime: string;
  remark: string;
}

export interface AreaListItem {
  id: string;
  createTime: string;
  remark: string;
}

export interface ActionListItem {
  id: string;
  name: string;
  condition: JSON;
  trigger: JSON;
  createTime: string;
  remark: string;
}

export interface DeviceDetail {
  var: Array<Object>;
  action: Array<Object>;
}

/**
 * @description: Request list return value
 */
export type DeviceListGetResultModel = BasicFetchResult<DeviceListItem>;

export type AreaListGetResultModel = BasicFetchResult<AreaListItem>;

export type ActionListGetResultModel = BasicFetchResult<ActionListItem>;
