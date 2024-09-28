<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" @click="goToHome">Home</el-menu-item>
        <el-menu-item index="2" @click="goToDetect">Detect</el-menu-item>
        <el-menu-item index="3" @click="goToRecord">Record</el-menu-item>
      </el-menu>
    </div>
    <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user_name">{{ userId }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import WebsocketService from "../service/websocket";
const store = useStore();

const userId = computed(() => store.getters["user/getUser"].userId);

const router = useRouter();

const goToDetect = () => {
  router.push("/main/detect");
};
const goToHome = () => {
  router.push("/main/home");
};
const goToRecord = () => {
  router.push("/main/record");
};
const logout = () => {
  WebsocketService.close();
  router.push("/login");
};
</script>
<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;
  .header-left {
    height: 100%;
    .icon {
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .tab {
      padding: 0 10px;
      height: 100%;
      .text {
        margin: 0 5px;
      }
      .close {
        visibility: hidden;
      }
      &.selected {
        a {
          color: #409eff;
        }
        i {
          color: #409eff;
        }
        background-color: #f5f5f5;
      }
    }
    .tab:hover {
      background-color: #f5f5f5;
      cursor: pointer;
      .close {
        visibility: inherit;
        color: black;
        cursor: pointer;
      }
    }
  }
  .header-right {
    .user_name {
      margin-left: 10px;
    }
  }
  a {
    height: 100%;
    color: #333;
    font-size: 15px;
  }
}
</style>
