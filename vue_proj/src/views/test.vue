<script setup>
  import { h } from 'vue'
  const dom = h(h1, { class: 'test' }, 'test')
</script>
<template>
  {{ dom() }}
</template>
