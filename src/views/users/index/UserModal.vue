<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { userFormSchema } from './user.data';
  import { isUserExist, setUserInfo } from '/@/api/users/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: userFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        updateSchema([
          {
            field: 'name',
            rules: [
              {
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (!value) {
                      reject('请输入用户名');
                    } else if (value !== data?.record?.name) {
                      isUserExist(value)
                        .then(() => resolve())
                        .catch((err) => {
                          reject(err.message || '验证失败');
                        });
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ],
          },
        ]);
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('routes.users.new_account') : t('routes.users.edit_account'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          setUserInfo(values);
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
