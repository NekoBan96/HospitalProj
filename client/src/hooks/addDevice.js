import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router/index.js";

export function addDevice() {
  const route = useRoute();
  const deviceName = ref("");
  const deviceDescription = ref("");
  const filePath = ref();
  const isShow = ref(false);
  const files = ref();
  const ErrorDialog = ref(false);
  const addDeviceToDb = async () => {
    try {
      if (deviceName.value === "" || deviceDescription.value === "" || route.params.id === "") 
        return;
      const formData = new FormData();
      formData.append("deviceName", deviceName.value);
      formData.append("deviceDescription", deviceDescription.value);
      formData.append("hospitalId", route.params.id);
      // formData.append("file", files.value[0].name.split(".")[0] || "");

      const response = await axios.post("http://localhost:5000/db/adddevice", formData);
      const deviceId = response.data.device_id;
      isShow.value = response.status === 201;
  
      if (files.value[0]) {
        const file = new FormData();
        file.append("file", files.value[0]);
        file.append("id", deviceId);
        file.append("fileExtension", files.value[0].name.split(".")[1]);
        // file.append("name", files.value[0].name.split(".")[0] || "");
        await axios.post("http://localhost:5000/upload/uploadFile", file);
      }
      router.push(`/hospital/${route.params.id}`);
    } catch (error) {
      ErrorDialog.value = true;
      console.log(error);
    }
  };
  return {
    deviceName,
    deviceDescription,
    filePath,
    addDeviceToDb,
    isShow,
    files,
    ErrorDialog,
  };
}
