<template>

    <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
        <!-- MAIN CONTAINER -->
        <div>
            <header>
                <Header></Header>
            </header>
            <MyDialog v-model:isShow="isShow" @update:isShow="value => isShow = value">
                <h1 class="text-[20px] text-center">Учреждение добавлено</h1>
            </MyDialog>
            <ErrorDialog v-model:ErrorDialog="ErrorDialog" @update:ErrorDialog="value => ErrorDialog = value">
                <h1 class="text-20 text-center">Аппарат не был добавлен</h1>
            </ErrorDialog>
            <main class="h-screen flex flex-col mt-[100px] dark:text-white">
                <div class="w-screen lg:mb-10 mb-2">
                    <h1 class="text-[30px] font-bold text-center">Добавление учреждения</h1>
                </div>
                <div class="flex justify-center items-center flex-col space-y-4">
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Название учреждения</h1>
                        <FormInput v-model="hospitalName"> </FormInput>
                    </div>
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Номер</h1>
                        <FormInput v-model="telNum"> </FormInput>
                    </div>
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Почта</h1>
                        <FormInput v-model="email"> </FormInput>
                    </div>
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Индекс (необязательно),
                            улица
                        </h1>
                        <FormInput v-model="geoPos"> </FormInput>
                    </div>
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Имя руководителя</h1>
                        <FormInput v-model="leaderName"> </FormInput>
                    </div>
                    <div class="flex justify-center items-center sm:space-x-10 flex-col lg:flex-row">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Должность руководителя</h1>
                        <FormInput v-model="leaderJobTitle"> </FormInput>
                    </div>
                </div>
                <div class="flex justify-center xl:justify-end xl:pr-[550px] items-center mt-[30px]">
                    <MyButton @click="addHospitalToDb()">Добавить</MyButton>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    </body>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { addHospital } from '@/hooks/addHospital.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue';
const { hospitalName, telNum, email, geoPos, leaderName, leaderJobTitle, addHospitalToDb, isShow, ErrorDialog } = addHospital();
const store = useStore()
const router = useRouter()
onBeforeMount(() => {
    if (!store.state.isAuth) {
        router.push('/login')
    }
});
</script>

<style scoped></style>