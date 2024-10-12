<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header"></div>
      </template>
      <div class="jump-link">
        <el-link type="primary" @click="handleChange"
          >{{ formType ? "返回登入" : "註冊帳號" }}
        </el-link>
      </div>

      <el-form-item label="帳號">
        <el-input v-model="loginForm.userName" />
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="loginForm.passWord" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        formType ? "註冊" : "登入"
      }}</el-button>
    </el-card>
  </el-row>
</template>
<script setup>
import WebsocketService from "../../service/websocket.js";
import axios from "axios";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import router from "../../router";
const store = useStore();
const loginForm = reactive({
  userName: "",
  passWord: "",
});
let formType = ref(0);
const handleChange = () => {
  formType.value = formType.value ? 0 : 1;
};
const onSubmit = async () => {
  if (!formType.value) {
    // 登入
    try {
      const response = await axios.post("http://54.252.113.192:3000/login", {
        username: loginForm.userName,
        password: loginForm.passWord,
      });
      if (response.data.userId) {
        console.log("Login success with userId", response.data.userId);
        store.commit("user/setUser", {
          userId: response.data.userId,
          username: loginForm.userName,
          password: loginForm.passWord,
        });
        WebsocketService.connect("ws://54.252.113.192:3000/", response.data.userId);
        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    // 註冊
    try {
      const response = await axios.post("http://54.252.113.192:3000/register", {
        username: loginForm.userName,
        password: loginForm.passWord,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.error);
    }
    formType = 0;
  }
};
</script>
<style lang="less" scoped>
:deep(.el-card_header) {
  padding: 0;

  .login-container {
    height: 100%;
    .card-header {
      background-color: #899fe1;
      .jump-link {
        text-align: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
