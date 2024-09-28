<template>
  <div class="detect-container">
    <div class="left-panel">
      <div class="student_container">
        <div
          class="student_list"
          v-for="(student, index) in student"
          :key="index"
        >
          {{ student }}
        </div>
      </div>
      <h3>目前連接裝置數:{{ student.length }}</h3>
    </div>

    <div class="right-panel">
      <div class="right-content">
        <div class="log-area">
          <div class="log-area">
            <div
              class="log_container"
              v-for="(log, index) in logMessage"
              :key="index"
            >
              {{ log }}
            </div>
          </div>
        </div>
        <div class="button_container">
          <el-button type="primary" @click="startDetection">開始偵測</el-button>
          <el-button type="primary" @click="clearDetection"
            >結束並清空檢測記錄</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import WebsocketService from "../../service/websocket";
import { useStore } from "vuex/dist/vuex.cjs.js";
import { computed, onMounted, ref } from "vue";
const student = ref([]);
const store = useStore();
const logMessage = ref([]);
const userId = computed(() => store.getters["user/getUser"].userId);
onMounted(() => {
  WebsocketService.addEventListener("studentData", handleStudentData);
  WebsocketService.addEventListener("notification", handleNotification);
  WebsocketService.sendStudentRequest();
});
const handleStudentData = (event) => {
  console.log(event);
  student.value = event;
};
const startDetection = () => {
  logMessage.value.push("開始偵測");
  console.log(logMessage.value);
  WebsocketService.send_start_detection();
};
const handleNotification = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  logMessage.value.push(`${timestamp}:${event}偵測到作弊行為`);
};
const clearDetection = () => {
  WebsocketService.send_stop_detection();
  logMessage.value = [];
};
</script>
<style scoped>
.detect-container {
  display: flex;
  justify-content: space-between;
  height: 90%;
}

.left-panel {
  flex: 1; /* Takes up equal space */
  background-color: #f4f4f4;
  padding: 20px;
  display: flex;
  flex-direction: column; /* Arrange children in a column */
  justify-content: space-between; /* Space out the children */
  align-items: center;
  font-size: 20px;
}
.student_container {
  flex: 1; /* Takes up space, but not as much as the h3 */
  display: flex;
  flex-direction: column;
  width: 100%;
}

.student_list {
  margin-bottom: 10px; /* Add some space between student items */
}
.log_container {
  display: flex;
  flex-direction: row;
}
h3 {
  margin: 20px 0; /* Add some space above and below the h3 */
}
.right-panel {
  flex: 1; /* Takes up more space */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.log-area {
  flex: 1;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px; /* Adjust padding as needed */
  height: 400px; /* Set a fixed height for the log area */
  overflow-y: auto; /* Enable vertical scrolling */
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.el-button {
  margin-right: 10px;
}
</style>
