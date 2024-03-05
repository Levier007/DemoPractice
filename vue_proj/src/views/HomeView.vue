<script setup lang="ts">
  import { ref } from 'vue'
  import Text from './test.vue'
  import { getBlogDetail } from '@/api/test'
  const getBlogData = async () => {
    let data = await getBlogDetail({ id: 1 })
  }
</script>

<template>
  <button @click="getBlogData">发送请求(docker)</button>
  <Test></Test>
</template>

<style scoped></style>
