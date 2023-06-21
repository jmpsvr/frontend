<template>
  <!-- <PageWrapper> -->
  <div class="lg:flex">
    <div class="lg:w-5/10 enter-y">
      <Selector class="selector" :id="0" />
    </div>
    <div class="lg:w-5/10 enter-y">
      <Selector class="selector" :id="1" />
    </div>
  </div>
  <div class="lg:flex">
    <div class="lg:w-5/10 enter-y">
      <Selector class="selector" :id="2" />
    </div>
    <div class="lg:w-5/10 enter-y">
      <Selector class="selector" :id="3" />
    </div>
  </div>
  <!-- </PageWrapper> -->
</template>

<script>
  import { defineComponent } from 'vue';

  import Selector from './components/selector.vue'; // filename use 'Selector.vue' cause unknown error

  export default defineComponent({
    name: 'Cluster',
    components: { Selector },
  });
</script>
