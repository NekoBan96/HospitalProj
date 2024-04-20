import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default function deleteHospital() {
  const store = useStore();
  const toast = useToast();
  const deleteRequest = async (hospital_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/db/deletehospital?id=${hospital_id}`
      );
      // headers: {
      //     Authorization: store.getters.getToken,
      // }
      if (response.status === 200) {
        toast.info("Учреждение удалено", {
          timeout: 2000,
        });
      }
    } catch (error) {
      toast.error("Произошла какая-то ошибка ", {
        timeout: 2000,
      });
      console.log(error);
    }
  };

  return {
    deleteRequest,
  };
}
