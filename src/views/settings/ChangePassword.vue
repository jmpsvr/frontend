<template>
  <PageWrapper title="修改密码" content="">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { changePassword } from '/@/api/sys/user';

  import { formSchema } from './pwd.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import { useRouter } from 'vue-router';
  // import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;

          await changePassword({ passwordOld, passwordNew });
          const { createMessage } = useMessage();
          createMessage.success('修改密码成功');
          // const router = useRouter();
          // router.push(PageEnum.BASE_HOME);
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>

function useToast() { throw new Error('Function not implemented.'); }
