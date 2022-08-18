<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './area.data';

  import { getAreaList, setArea } from '/@/api/devices/index';

  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  export default defineComponent({
    name: 'AreaModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getAreaList();
        updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('routes.devices.new_area') : t('routes.devices.edit_area'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await setArea(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
