<script setup lang="ts">
  import { ref } from 'vue'
  const content1 = ref('')
  const content2 = ref('')
  const testForm = ref({})
  const handleInputChange = (key: string, e: object) => {
    testForm.value[key] = content1.value
    console.log(testForm.value)
    console.log(e)
  }
  const handleDivClicked = (e: any) => {
    console.log('div is clicked', e)
  }
  const handleULclicked = (e: any) => {
    console.log('ul is clicked', e)
  }
</script>

<template>
  <div>
    <span>用户名</span>
    <input
      type="text"
      v-model="content1"
      @change="handleInputChange('userName', $event)" />
    <span>密码</span>
    <input
      type="text"
      v-model="content2"
      @change="handleInputChange('password')" />
  </div>
  <div
    class="bgDiv"
    @click="handleDivClicked"></div>
  <ul>
    <li @click="handleULclicked">111</li>
    <li>222</li>
    <li>333</li>
  </ul>
</template>

<style scoped>
  .bgDiv {
    width: 100px;
    height: 100px;
    background-color: #ffd;
  }
</style>
