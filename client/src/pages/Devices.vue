<template>
  <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
    <!-- MAIN CONTAINER -->
    <div>
      <!-- Header -->
      <div class="flex flex-col justify-center mb-20">
        <Header></Header>
        <MyInput
          class="lg:self-start lg:ml-[360px]"
          v-model="searchQuery"
          @search_request="searchRequest()"
        >
        </MyInput>
      </div>
      <div class="w-screen mb-[30px] flex justify-around items-center">
        <h1 class="text-[35px] font-bold inline dark:text-white">Аппаратура</h1>
        <div v-show="isAuth">
          <MyButton @click="addButtonPressed()">Добавить</MyButton>
        </div>
      </div>
      <Modal v-model:show="dialogVisible">
        <div class="flex flex-col justify-center items-center">
          <div>
            <h1 class="font-bold text-center">
              Вы уверены что хотите удалить этот аппарат?
            </h1>
          </div>
          <div class="flex justify-center items-center gap-3 mt-[10px]">
            <MyButton class="w-[70px]" @click="deleteFunc">Да</MyButton>
            <MyButton class="w-[70px]" @click="dialogVisible = false"
              >Нет</MyButton
            >
          </div>
        </div>
      </Modal>
      <!-- Devices List -->
      <div class="min-h-[800px] w-full flex flex-col">
        <DeviceList
          :devices="sortedByRouteIdDevices"
          :typeOfReq="typeOfReq"
          @delete="openDialog"
        >
        </DeviceList>
      </div>
      <!-- PAGINATION -->
      <div class="flex items-center justify-center my-6">
        <div
          v-show="!isPaginationHidden"
          v-for="(page, index) in totalPages"
          :key="page"
          class="flex items-center justify-center border-2 border-black h-[30px] w-[30px] cursor-pointer dark:text-white dark:border-white p-[15px]"
          :class="{
            'current-page': page === currentPage,
            'rounded-l': index === 0,
            'rounded-r': index === totalPages - 1,
          }"
          @click="fetchPage(page)"
        >
          {{ page }}
        </div>
      </div>
      <div>
        <Footer> </Footer>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DeviceList from "@/components/DeviceList.vue";
import { useDevices } from "@/hooks/useDevice.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import deleteDevice from "@/hooks/deleteDevice.js";
import { useToast } from "vue-toastification";
const store = useStore();
const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
let isPaginationHidden = ref(false);
const dialogVisible = ref(false);
let idToDelete = "";
let isAuth = store.state.isAuth;
const {
  devices,
  sortedByRouteIdDevices,
  currentPage,
  totalPages,
  loadDevices,
  typeOfReq,
  allDevices,
} = useDevices();
const { deleteRequest } = deleteDevice();
// FUNCTTIONS
const searchRequest = () => {
  try {
    if (searchQuery.value === "") {
      isPaginationHidden.value = false;
      fetchPage(1);
      return;
    } else {
      isPaginationHidden.value = true;
      sortedByRouteIdDevices.value = devices.value.filter((device) =>
        device.device_name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    }
  } catch (error) {
    console.log(error);
  }
};
const openDialog = (id) => {
  idToDelete = id;
  dialogVisible.value = true;
};
const fetchPage = (page) => {
  isPaginationHidden.value = false;
  currentPage.value = page;
  loadDevices();
  console.log(currentPage.value);
};
const addButtonPressed = () => {
  router.push({ path: `/hospital/${route.params.id}/addDevice` });
};
const typeOfReqComp = computed(() => {
  return typeOfReq.value;
});

const deleteFunc = async () => {
  await deleteRequest(idToDelete);
  // await loadDevices();
  if (sortedByRouteIdDevices.value.length === 0) {
    currentPage.value--;
  }
  loadDevices();
  dialogVisible.value = false;
};
</script>

<style scoped>
.current-page {
  border-color: rgba(106, 106, 255, 1);
}
</style>
