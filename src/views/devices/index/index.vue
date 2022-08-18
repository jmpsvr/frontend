<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <AreaTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增设备</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看设备详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑设备资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此设备',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DeviceModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteDevice, getDeviceList } from '/@/api/devices/index';
  import { PageWrapper } from '/@/components/Page';
  import AreaTree from './AreaTree.vue';

  import { useModal } from '/@/components/Modal';
  import DeviceModal from './DeviceModal.vue';

  import { columns, searchFormSchema } from './device.data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'DeviceManagement',
    components: { BasicTable, PageWrapper, AreaTree, DeviceModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '设备列表',
        api: getDeviceList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        deleteDevice(record?.id).then(() => {
          reload();
        });
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          updateTableDataRecord(values.id, values);
        } else {
          reload();
        }
      }

      function handleSelect(area = '') {
        searchInfo.area = area;
        reload();
      }

      function handleView(record: Recordable) {
        go('/devices/r/' + record.id);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
