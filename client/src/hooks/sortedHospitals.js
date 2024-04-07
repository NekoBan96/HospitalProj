import { ref, computed } from 'vue'

export default function useSortedHospitals(hospitals) {
    const searchQuery = ref('')

    const sortedHospitals = computed(() => {
        try {
            return hospitals.value.filter(hospital => hospital.hospitalName.toLowerCase().includes(searchQuery.value.toLowerCase()))
        } catch (error) {
            console.log(error)
        }
    })

    return {
        searchQuery, sortedHospitals
    }
};