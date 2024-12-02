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
          <el-table-column type="expand">
            <template #default="props">
              <el-table
                :data="expandedDetails[props.row.noticeInfo]"
                style="width: 100%"
              >
                <el-table-column
                  prop="notice_id"
                  label="紀錄 ID"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="時間"
                  width="200"
                ></el-table-column>
                <el-table-column prop="image" label="圖片">
                  <template #default="imgScope">
                    <img
                      :src="imgScope.row.image"
                      alt="作弊圖片"
                      style="width: 100%; height: auto; object-fit: contain"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="clearRecords" type="danger" class="clear-button">
          清空紀錄
        </el-button>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import WebsocketService from "../../service/websocket";

const tableData = ref([]);
const expandedDetails = ref({});
const expandedRowKeys = ref([]);

const handleRecord = (event) => {
  if (Array.isArray(event)) {
    const recordMap = {};
    const detailMap = {};

    event.forEach((record) => {
      const { notice_info } = record;
      recordMap[notice_info] = (recordMap[notice_info] || 0) + 1;

      if (!detailMap[notice_info]) {
        detailMap[notice_info] = [];
      }

      if (record.image) {
        record.image = handleBase64Image(record);
      }

      detailMap[notice_info].push(record);
    });

    tableData.value = Object.entries(recordMap).map(([noticeInfo, count]) => ({
      noticeInfo,
      count,
    }));
    expandedDetails.value = detailMap;
  } else {
    console.error("Event data is not an array");
  }
};

const handleBase64Image = (record) => {
  if (record.image?.type === "Buffer" && Array.isArray(record.image.data)) {
    const base64String = btoa(
      new Uint8Array(record.image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/jpeg;base64,${base64String}`;
  }
  return record.image;
};

const toggleExpand = (row) => {
  const index = expandedRowKeys.value.indexOf(row.noticeInfo);
  if (index > -1) {
    expandedRowKeys.value.splice(index, 1);
  } else {
    expandedRowKeys.value.push(row.noticeInfo);
  }
};

const clearRecords = () => {
  // 釋放 Blob URL
  Object.values(expandedDetails.value).forEach((details) => {
    details.forEach((record) => {
      if (record.image.startsWith("blob:")) {
        URL.revokeObjectURL(record.image);
      }
    });
  });

  // 清空數據
  WebsocketService.sendClearRequest(userId.value.userId);
  tableData.value = [];
  expandedDetails.value = {};
};

onMounted(() => {
  WebsocketService.addEventListener("record", handleRecord);
  const plainUserId = userId.value.userId;
  WebsocketService.sendRecordRequest(plainUserId);
});

const store = useStore();
const userId = computed(() => store.getters["user/getUser"]);
</script>
