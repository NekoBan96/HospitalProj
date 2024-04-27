// import { ref, computed } from 'vue'
// export default function useSortedHospitals(allHospitals, searchQuery) {
//     const sortedHospitals = () => {
//         try {
//             return allHospitals.value.filter(hospital => hospital.hospital_name.toLowerCase().includes(searchQuery.value.toLowerCase()))
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return {
//         sortedHospitals
//     }
// };