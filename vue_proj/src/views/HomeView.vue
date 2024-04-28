<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import Text from './test.vue'
  import { getAll, login, register } from '@/api/test'
  const formData = reactive({
    username: '',
    password: ''
  })
  const getAllData = async () => {
    let data = await getAll()
  }
  const handleRegister = async () => {
    let data = await register(formData)
  }
  const handleLogin = async () => {
    let data = await login(formData)
  }
  onMounted(() => {
    getAllData()
  })
</script>

<template>
  <el-form
    :model="formData"
    label-width="auto"
    style="max-width: 300px">
    <el-form-item label="用户名">
      <el-input v-model="formData.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleRegister"
        >注册</el-button
      >
      <el-button
        type="primary"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
  <!-- <Test></Test> -->
</template>

<style scoped></style>
