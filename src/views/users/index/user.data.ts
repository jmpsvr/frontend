import { getAllRoleList } from '/@/api/users/index';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setUserStatus } from '/@/api/users/index';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          setUserStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 180,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
    ifShow: false,
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
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const userFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
    helpMessage: ['不能与其他人重复'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },

  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '停用', value: false },
        { label: '启用', value: true },
      ],
    },
    required: true,
  },

  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'name',
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
