<template>
    <div
        class="flex flex-col justify-center xl:w-[1270px] bg-white border-2 px-[20px] py-[20px] mx-2 rounded-[20px] xl:whitespace-nowrap overflow-hidden dark:bg-gray-900 dark:border-gray-400">
        <div class="flex justify-between items-center">
            <h1 class="mb-4 font-bold text-[20px] max-w-[1200px] overflow-hidden dark:text-white cursor-pointer"
                @click="() => $router.push({ path: `/hospital/${hospital._id}` })">{{
                    hospital.hospitalName }}</h1>
            <i class="fa-solid fa-trash mr-[10px] dark:text-white text-[20px] cursor-pointer"
                @click="$emit('deleteHospital', hospital._id)" v-show="isAuth"></i>
        </div>
        <div class="flex flex-col sm:space-x-2 sm:items-center max-w-1100px overflow-hidden sm:flex-row">
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-phone dark:text-white"></i>
                <p class="text-blue-500">{{ hospital.telNum }}</p>
            </div>
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-envelope dark:text-white"></i>
                <p class="dark:text-white">{{ hospital.email }}</p>
            </div>
        </div>
        <div class="flex items-center space-x-2 mb-5">  
            <i class="fa-solid fa-location-dot dark:text-white"></i>
            <p class="dark:text-white">{{ hospital.geoPos }}</p>
        </div>
        <div class="flex items-center space-x-2 -[1px] py-2">
            <i class="fa-regular fa-user text-[35px] dark:text-white"></i>
            <div>
                <p class="dark:text-white font-bold">{{ hospital.leaderName }}</p>
                <p class="dark:text-white">{{ hospital.leaderJobTitle }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    props: {
        hospital: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore()
        let isAuth = store.state.isAuth
        return {isAuth}
    }
}
</script>

<style scoped></style>