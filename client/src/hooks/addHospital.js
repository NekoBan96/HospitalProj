import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import router from "@/router/index.js";
import { useToast } from "vue-toastification";
export function addHospital() {
  const hospitalName = ref("");
  const telNum = ref("");
  const email = ref("");
  const geoPos = ref("");
  const leaderName = ref("");
  const leaderJobTitle = ref("");
  const store = useStore();
  const toast = useToast();
  const addHospitalToDb = async () => {
    try {
      if (
        hospitalName.value === "" ||
        telNum.value === "" ||
        email.value === "" ||
        geoPos.value === "" ||
        leaderName.value === "" ||
        leaderJobTitle.value === ""
      ) {
        toast.warning("Заполните все поля!", {
          timeout: 2000,
        });
        return 1;
      }
      const formData = new FormData();
      formData.append("hospitalName", hospitalName.value);
      formData.append("telNum", telNum.value);
      formData.append("email", email.value);
      formData.append("geoPos", geoPos.value);
      formData.append("leaderName", leaderName.value);
      formData.append("leaderJobTitle", leaderJobTitle.value);
      const response = await axios.post(
        "http://localhost:5000/db/addhospital",
        formData,
        {
          headers:{
            authorization: store.getters.getToken
          }
        }
      );
      hospitalName.value = "";
      telNum.value = "";
      email.value = "";
      geoPos.value = "";
      leaderName.value = "";
      leaderJobTitle.value = "";
      router.push("/");
      toast.success("Учреждение добавлено", {
        timeout: 2000,
      });
    } catch (error) {
      toast.error("Учреждение не было добавлено", {
        timeout: 2000,
      });
    }
  };
  return {
    hospitalName,
    telNum,
    email,
    geoPos,
    leaderName,
    leaderJobTitle,
    addHospitalToDb,
  };
}
