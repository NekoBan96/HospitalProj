<template>
    <div
        class="flex flex-col justify-center rounded-[20px] bg-white lg:w-[1150px] lg:h-[170px] border-2 overflow-hidden py-2 px-[20px] w-full h-auto dark:bg-gray-900">
        <div class="flex justify-between items-center">
            <h1
                class="font-bold text-[25px] max-w-[900px] overflow-hidden whitespace-nowrap mb-2 capitalize dark:text-white">
                {{
                    device.device_name }}
            </h1>
            <i class="fa-solid fa-trash mr-[10px] dark:text-white text-[20px] cursor-pointer"
                @click="$emit('deleteDevice', device.device_id)" v-show="isAuth"></i>
        </div>
        <p class="max-h-[180px] oveflow-hidden mb-4 capitalize dark:text-white">{{ device.device_desk }}</p>
        <MyButton class="self-start" @click="download(device.device_id)">Скачать</MyButton>
    </div>
</template>

<script>
import { downloadDevice } from '@/hooks/downloadDevice.js'
import { useStore } from 'vuex'
export default {
    props: {
        device: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const store = useStore()
        let isAuth = store.state.isAuth
        const { download } = downloadDevice()
        return {
            download,
            isAuth
        }
    }
}
</script>

<style scoped></style>