import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export function useDevices() {
    const devices = ref([])
    const sortedByRouteIdDevices = ref([])
    const route = useRoute()
    const limit = ref(10);
    const totalPages = ref();
    const currentPage = ref(1);
    const typeOfReq = ref(0); // 0-Loading 1-Everything is fine 2-AxiosError
    const loadDevices = async () => {
        try {
            const response = (await axios.get('http://localhost:5000/db/getdevicebyhospitalid', {
                params: {
                    id: route.params.id,
                }
            }))
            devices.value = response.data
            totalPages.value = Math.ceil(response.data.length / limit.value)
            sortedByRouteIdDevices.value = (await axios.get('http://localhost:5000/db/getdevicebyhospitalid', {
                params: {
                    id: route.params.id,
                    page: currentPage.value
                }
            })).data
            typeOfReq.value = 1
        } catch (error) {
            typeOfReq.value = 2
            console.log(error)
        }
    }

    onMounted(loadDevices)

    return {
        devices,
        sortedByRouteIdDevices,
        currentPage, totalPages, loadDevices, typeOfReq
    }
}