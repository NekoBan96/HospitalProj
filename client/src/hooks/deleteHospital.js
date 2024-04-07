import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default function deleteHospital() {
    const store = useStore()
    const deleteRequest = async (id) => {
        try {
            const response = axios.delete('http://localhost:5000/db/deletehospital', {
                params: {
                    id: id
                },
                headers: {
                    Authorization: store.getters.getToken,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        deleteRequest
    }
}