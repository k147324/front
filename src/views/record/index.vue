<template>
  <div class="panel-container">
    <div class="record">
      <div class="record-header">紀錄</div>
      <el-scrollbar class="scroll-area">
        <div>
          <div v-for="(count, noticeInfo) in rec" :key="index">
            {{ noticeInfo }}: {{ count }} 次
          </div>
        </div>
        <el-button @click="clearRecords" type="danger" class="clear-button">
          清空紀錄
        </el-button>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import WebsocketService from "../../service/websocket";
onMounted(() => {
  WebsocketService.addEventListener("record", handleRecord);
  const plainUserId = userId.value.userId;
  WebsocketService.sendRecordRequest(plainUserId);
});

const rec = ref({});
const handleRecord = (event) => {
  console.log(event);

  if (Array.isArray(event)) {
    const newRecord = { ...rec.value };

    event.forEach((record) => {
      const { notice_info } = record;
      if (newRecord[notice_info]) {
        newRecord[notice_info]++;
      } else {
        newRecord[notice_info] = 1;
      }
    });

    rec.value = newRecord;
  } else {
    console.error("Event data is not an array");
  }
};
const clearRecords = () => {
  WebsocketService.sendClearRequest(userId.value.userId);
  rec.value = {};
};
const store = useStore();
const userId = computed(() => store.getters["user/getUser"]);
</script>
