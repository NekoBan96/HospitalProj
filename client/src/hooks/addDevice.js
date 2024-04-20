import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router/index.js";
import { useToast } from "vue-toastification";
export function addDevice() {
  const route = useRoute();
  const deviceName = ref("");
  const deviceDescription = ref("");
  const filePath = ref();
  const files = ref();
  const toast = useToast();
  const addDeviceToDb = async () => {
    try {
      if (deviceName.value === "" || deviceDescription.value === "" || !files.value){
        toast.warning("Заполните все поля!", {
          timeout: 2000,
        });
        return;
      }
      const formData = new FormData();
      formData.append("deviceName", deviceName.value);
      formData.append("deviceDescription", deviceDescription.value);
      formData.append("hospitalId", route.params.id);
      // formData.append("file", files.value[0].name.split(".")[0] || "");

      const response = await axios.post("http://localhost:5000/db/adddevice", formData);
      const deviceId = response.data.device_id;
  
      if (files.value[0]) {
        const file = new FormData();
        file.append("file", files.value[0]);
        file.append("id", deviceId);
        file.append("fileExtension", files.value[0].name.split(".")[1]);
        // file.append("name", files.value[0].name.split(".")[0] || "");
        await axios.post("http://localhost:5000/upload/uploadFile", file);
      }
      router.push(`/hospital/${route.params.id}`);
      toast.success("Аппарат добавлен", {
          timeout: 2000,
        });
    } catch (error) {
      console.log(error);
      toast.error("Произошла какая-то ошибка...", {
        timeout: 2000,
      });
    }
  };
  return {
    deviceName,
    deviceDescription,
    filePath,
    addDeviceToDb,
    files,
  };
}
