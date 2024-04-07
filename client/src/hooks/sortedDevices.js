import { ref, computed } from 'vue'

export default function useSortedDevices(devices) {
    const searchQuery = ref('')

    const sortedDevices = computed(() => {
        try {
            return devices.value.filter(device => device.deviceName.toLowerCase().includes(searchQuery.value.toLowerCase()))
        } catch (error) {
            console.log(error)
        }
    })

    return {
        searchQuery, sortedDevices
    }
};