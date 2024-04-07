<template>

    <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
        <div class="flex flex-col">
            <!-- HEADER -->
            <Header @loadHospitals="fetchPage(1)"> </Header>
            <div class="flex xl:ml-[340px] xl:self-start">
                <MyInput class="sm:mb-10" v-model="searchQuery"> </MyInput>
            </div>
            <Modal v-model:show="dialogVisible">
                <div class="flex flex-col justify-center items-center">
                    <div>
                        <h1 class="font-bold text-center">Вы уверены что хотите удалить учреждение?</h1>
                    </div>
                    <div class="flex justify-center items-center gap-3 mt-[10px]">
                        <MyButton class="w-[70px]" @click="deleteFunc">Да</MyButton>
                        <MyButton class="w-[70px]" @click="dialogVisible = false">Нет</MyButton>
                    </div>
                </div>
            </Modal>
            <!-- Hospitals List -->
            <div class="w-screen flex flex-col items-center">
                <div class="lg:space-y-10 flex flex-col lg:w-[1250px] min-h-[800px] w-full">
                    <div class="flex sm:flex-row flex-col justify-between items-center space-y-2 mb-5">
                        <div class="flex sm:justify-center items-center self-start">
                            <h1
                                class="font-bold dark:text-white dark:border-white border-black sm:text-[35px] text-[20px] sm:ml-0 ml-5">
                                Подведомственные
                                учреждения
                            </h1>
                        </div>
                        <div v-show="isAuth">
                            <MyButton @click="$router.push('/addhospital')">Добавить</MyButton>
                        </div>
                    </div>
                    <HospitalList :hospitals="sortedHospitals" @delete="openDialog"> </HospitalList>
                </div>
            </div>
            <!-- PAGINATION -->
            <div class="flex items-center justify-center my-6">
                <div v-for="page in totalPages" :key="page"
                    class="flex items-center justify-center border-2 border-black h-[30px] w-[30px] cursor-pointer dark:text-white dark:border-white p-[15px]"
                    :class="{
                'current-page': page === currentPage,
                'rounded-l-lg': page === 1,
                'rounded-r-lg': page === totalPages
            }" @click="fetchPage(page)">{{ page }}</div>
            </div>
            <!-- FOOTER -->
            <div>
                <Footer> </Footer>
            </div>
        </div>
    </body>
</template>

<script setup>
import { ref } from 'vue'
import { useDark } from '@vueuse/core';
import { useStore } from 'vuex';
import HospitalList from '@/components/HospitalList.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useHospitals } from '@/hooks/useHospitals.js';
import useSortedHospitals from '@/hooks/sortedHospitals.js';
import deleteHospital from '@/hooks/deleteHospital.js';
const store = useStore()
let isAuth = store.state.isAuth
const { deleteRequest } = deleteHospital();
const { hospitals, totalPages, currentPage, loadHospitals } = useHospitals();
const { searchQuery, sortedHospitals } = useSortedHospitals(hospitals);
const dialogVisible = ref(false)
let idToDelete = ''
const openDialog = (id) => {
    idToDelete = id;
    dialogVisible.value = true
}
const fetchPage = (page) => {
    currentPage.value = page;
    loadHospitals();
};
const deleteFunc = () => {
    deleteRequest(idToDelete)
    loadHospitals();
    dialogVisible.value = false
}

</script>

<style scoped>
.current-page {
    border-color: rgba(106, 106, 255, 1);
}
</style>