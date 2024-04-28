import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default function deleteDevice() {
  const store = useStore();
  const toast = useToast();
  const deleteRequest = async (id) => {
    try {
      const response = await axios.delete("http://localhost:5000/db/deletedevice", {
        params: {
          id: id,
        },
        headers: {
          authorization: store.getters.getToken,
        },
      });
      console.log(response)
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
