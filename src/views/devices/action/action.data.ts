import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 160,
    align: 'left',
  },
  {
    title: '动作名称',
    dataIndex: 'name',
    width: 160,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ record }) => {
      return new Date(record.createTime).toLocaleString();
    },
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '动作名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'name',
    label: '动作名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'condition',
    label: '条件',
    component: 'InputTextArea',
  },
  {
    field: 'trigger',
    label: '触发',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
