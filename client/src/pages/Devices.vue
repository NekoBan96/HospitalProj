<template>
  <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
    <!-- MAIN CONTAINER -->
    <div>
      <!-- Header -->
      <div class="flex flex-col justify-center mb-20">
        <Header></Header>
        <MyInput class="lg:self-start lg:ml-[360px]" v-model="searchQuery">
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
          :devices="sortedDevices"
          :typeOfReq="typeOfReq"
          @delete="openDialog"
        >
        </DeviceList>
      </div>
      <!-- PAGINATION -->
      <div class="flex items-center justify-center my-6">
        <div
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
import useSortedDevices from "@/hooks/sortedDevices.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import deleteDevice from "@/hooks/deleteDevice.js";
import { useToast } from "vue-toastification";
const store = useStore();
const router = useRouter();
const route = useRoute();
const {
  devices,
  sortedByRouteIdDevices,
  currentPage,
  totalPages,
  loadDevices,
  typeOfReq,
} = useDevices();
const { searchQuery, sortedDevices } = useSortedDevices(sortedByRouteIdDevices);
const { deleteRequest } = deleteDevice();
const dialogVisible = ref(false);
let idToDelete = "";
let isAuth = store.state.isAuth;
// FUNCTTIONS
const openDialog = (id) => {
  idToDelete = id;
  dialogVisible.value = true;
};
const fetchPage = (page) => {
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
  if (sortedDevices.value.length === 0) {
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
