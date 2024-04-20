import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useToast } from "vue-toastification";
export function useHospitals() {
    const hospitals = ref([])
    const allHospitals = ref([])
    const limit = ref(10);
    const totalPages = ref();
    const currentPage = ref(1)
    const toast = useToast();
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
            toast.error("Произошла какая-то ошибка...", {
                timeout: 2000,
              });
        }
    }
    onBeforeMount(loadHospitals)
    return {
        hospitals, totalPages, limit, currentPage, loadHospitals, allHospitals
    }
}