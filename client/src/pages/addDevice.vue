<template>

    <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
        <!-- MAIN CONTAINER -->
        <div>
            <header>
                <Header></Header>
            </header>
            <main class="h-screen flex flex-col mt-[100px] dark:text-white">
                <div class="w-screen lg:mb-10 mb-2">
                    <h1 class="text-[30px] font-bold text-center">Добавление аппаратуры</h1>
                </div>
                <div class="flex justify-center items-center flex-col space-y-4">
                    <div class="flex justify-center items-center space-x-10 sm:flex-row flex-col">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Название аппарата</h1>
                        <div class="w-[300px]">
                            <FormInput v-model="deviceName"> </FormInput>
                        </div>
                    </div>
                    <div class="flex justify-center items-center space-x-10 sm:flex-row flex-col">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Описание</h1>
                        <div class="w-[300px]">
                            <FormInput v-model="deviceDescription"> </FormInput>
                        </div>
                    </div>
                    <div class="flex justify-center items-center space-x-10 sm:flex-row flex-col">
                        <h1 class="font-bold text-[20px] w-[330px] text-center lg:text-end">Файл</h1>
                        <div class="flex justify-center items-center w-[300px]">
                            <input type="file" @change="onFileChange">
                        </div>
                    </div>
                </div>
                <div class="flex justify-center xl:justify-end xl:pr-[500px] items-center mt-[30px]">
                    <MyButton @click="addDeviceToDb()" @keyup.enter="addDeviceToDb()">Добавить</MyButton>
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
import { addDevice } from '@/hooks/addDevice.js';
import { ref, onBeforeMount  } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const { deviceName, deviceDescription, hospitalId, filePath, addDeviceToDb, files } = addDevice();
const onFileChange = (e) => {
    files.value = e.target.files || e.dataTransfer.files;
}
onBeforeMount(() => {
    if (!store.state.isAuth) {
        router.push('/login')
    }
});
</script>
