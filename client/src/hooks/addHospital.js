import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export function addHospital() {
    const hospitalName = ref('')
    const telNum = ref('')
    const email = ref('')
    const geoPos = ref('')
    const leaderName = ref('')
    const leaderJobTitle = ref('')
    const isShow = ref(false)
    const ErrorDialog = ref(false)
    const store = useStore()
    const addHospitalToDb = async () => {
        try {
            if (hospitalName.value === '' || telNum.value === '' || email.value === '' || geoPos.value === '' || leaderName.value === '' || leaderJobTitle.value === '') {
                return 1
            }
            const formData = new FormData();
            formData.append('hospitalName', hospitalName.value);
            formData.append('telNum', telNum.value);
            formData.append('email', email.value);
            formData.append('geoPos', geoPos.value);
            formData.append('leaderName', leaderName.value);
            formData.append('leaderJobTitle', leaderJobTitle.value);
            const response = await axios.post("http://localhost:5000/db/addhospital", formData, {
                headers: {
                    Authorization: store.getters.getToken,
                }
            });
            response.statusText === "Created" ? isShow.value = true : isShow.value = false
            hospitalName.value = ''
            telNum.value = ''
            email.value = ''
            geoPos.value = ''
            leaderName.value = ''
            leaderJobTitle.value = ''
        } catch (error) {
            ErrorDialog.value = true
            console.log(error)
        }
    }
    return {
        hospitalName, telNum, email, geoPos, leaderName, leaderJobTitle, addHospitalToDb, isShow, ErrorDialog
    }
}