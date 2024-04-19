import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
export function useHospitals() {
    const hospitals = ref([])
    const allHospitals = ref([])
    const limit = ref(10);
    const totalPages = ref();
    const currentPage = ref(1)
    const loadHospitals = async () => {
        try {
            const allHospitalsRes = await axios.get('http://localhost:5000/db/getallhospitals')
            const response = await axios.get('http://localhost:5000/db/gethospitals', {
                params: {
                    page: currentPage.value
                },
            });
            allHospitals.value = allHospitalsRes.data
            hospitals.value = response.data
            totalPages.value = Math.ceil(allHospitals.value.length / limit.value)
        } catch (error) {
            console.log(error)
        }
    }
    onBeforeMount(loadHospitals)
    return {
        hospitals, totalPages, limit, currentPage, loadHospitals, allHospitals
    }
}