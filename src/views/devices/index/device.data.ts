import { getAreaList, getTypeList } from '/@/api/devices/index';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      const typeList = ['Common', 'Onvif'];
      return typeList[record.type];
    },
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ record }) => {
      return new Date(record.createTime).toLocaleString();
    },
    width: 160,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '设备ID',
    component: 'InputNumber',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '设备名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const deviceFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'name',
    label: '设备名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入设备名称',
      },
    ],
  },
  {
    field: 'type',
    label: '设备类型',
    component: 'ApiSelect',
    componentProps: {
      api: getTypeList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'area',
    label: '所属区域',
    component: 'ApiSelect',
    componentProps: {
      api: getAreaList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    label: '连接信息',
    field: 'conn',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
