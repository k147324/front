<template>
  <div class="panel-container">
    <div class="record">
      <div class="record-header">紀錄</div>
      <el-scrollbar class="scroll-area">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="noticeInfo"
            label="學生 ID"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="count"
            label="作弊次數"
            width="180"
          ></el-table-column>
        </el-table>
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

const tableData = ref([]);

const handleRecord = (event) => {
  if (Array.isArray(event)) {
    const recordMap = {};

    event.forEach((record) => {
      const { notice_info } = record;
      recordMap[notice_info] = (recordMap[notice_info] || 0) + 1;
    });

    tableData.value = Object.entries(recordMap).map(([noticeInfo, count]) => ({
      noticeInfo,
      count,
    }));
  } else {
    console.error("Event data is not an array");
  }
};

const clearRecords = () => {
  WebsocketService.sendClearRequest(userId.value.userId);
  tableData.value = [];
};

onMounted(() => {
  WebsocketService.addEventListener("record", handleRecord);
  const plainUserId = userId.value.userId;
  WebsocketService.sendRecordRequest(plainUserId);
});

const store = useStore();
const userId = computed(() => store.getters["user/getUser"]);
</script>
