<template>
    <div
        class="flex flex-col justify-center xl:w-[1280px] bg-white border-2 px-[20px] py-[20px] mx-2 rounded-[20px] xl:whitespace-nowrap overflow-hidden dark:bg-gray-900 dark:border-gray-400">
        <div class="flex justify-between items-center">
            <h1 class="mb-4 font-bold text-[20px] max-w-[1180px] overflow-hidden dark:text-white cursor-pointer"
                @click="() => $router.push({ path: `/hospital/${hospital.hospital_id}` })">{{
                    hospital.hospital_name }}</h1>
            <i class="fa-solid fa-trash mr-[10px] dark:text-white text-[20px] cursor-pointer"
                @click="$emit('deleteHospital', hospital.hospital_id)" v-show="isAuth"></i>
        </div>
        <div class="flex flex-col sm:space-x-2 sm:items-center max-w-1100px overflow-hidden sm:flex-row">
            <div class="flex items-center space-x-2">
                <img src="@/svgs/phone.svg" alt="" class="w-[15px]">
                <p class="text-blue-500">{{ hospital.tel_num }}</p>
            </div>
            <div class="flex items-center space-x-2">
                <img src="@/svgs/email.svg" alt="" class="w-[15px]">
                <p class="dark:text-white">{{ hospital.email }}</p>
            </div>
        </div>
        <div class="flex items-center space-x-2 mb-5">  
                <img src="@/svgs/location.svg" alt="" class="w-[13px]">
            <p class="dark:text-white">{{ hospital.geo_pos }}</p>
        </div>
        <div class="flex items-center space-x-2 -[1px] py-2">
                <img src="@/svgs/user.svg" alt="" class="w-[30px]">
            <div>
                <p class="dark:text-white font-bold">{{ hospital.leader_name }}</p>
                <p class="dark:text-white">{{ hospital.leader_job_title }}</p>
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