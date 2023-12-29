<script setup lang="ts">
  import { ref } from 'vue'
  import { getBlogDetail } from '@/api/test'
  const getBlogData = async () => {
    let data = await getBlogDetail({ id: 1 })
  }
</script>

<template>
  <button @click="getBlogData">发送请求</button>
</template>

<style scoped></style>
