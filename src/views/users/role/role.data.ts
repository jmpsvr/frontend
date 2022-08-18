import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    customRender: ({ record }) => {
      return new Date(record.createTime).toLocaleString();
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'isUpdate',
    label: 'isUpdate',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.isUpdate;
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'permission',
    slot: 'menu',
    component: 'Input',
  },
];
