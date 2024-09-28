<template>
  <div class="detect_container">
    <!-- Left Panel -->
    <div class="left_panel">
      <div class="user_info">當前用戶ID: {{ userId.userId }}</div>
      <el-button type="primary" class="left_button" @click="goToDetect">
        前往偵測
      </el-button>
      <el-button type="primary" class="left_button" @click="goToRecord">
        前往紀錄
      </el-button>
    </div>

    <!-- Right Panel -->
    <div class="right_panel">
      <div class="notifications_header">最近通知</div>
      <div class="notifications" v-for="(data, index) in record" :key="index">
        {{ data.time }}:{{ data.notice_info }} 偵測到作弊行為
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import WebsocketService from "../../service/websocket";
import { useRouter } from "vue-router";
onMounted(() => {
  WebsocketService.addEventListener("record", handleRecord);
  const plainUserId = userId.value.userId;
  WebsocketService.sendRecordRequest(plainUserId);
});
const record = ref([]);
const handleRecord = (event) => {
  console.log(event);
  record.value = event;
  console.log(record.value[0]);
};

const store = useStore();
const userId = computed(() => store.getters["user/getUser"]);
const router = useRouter();

const goToDetect = () => {
  router.push("/main/detect");
};
const goToRecord = () => {
  router.push("/main/record");
};
</script>
<style scoped>
.detect_container {
  display: flex;
  height: 100vh;
}

.left_panel {
  width: 20%;
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user_info {
  margin-bottom: 20px;
  font-weight: bold;
}

.left_button {
  margin-bottom: 10px;
  width: 100%;
}

.right_panel {
  width: 80%;
  background-color: #fafafa;
  padding: 20px;
}

.notifications_header {
  font-weight: bold;
  margin-bottom: 10px;
}

.notifications p {
  margin: 5px 0;
}
</style>
