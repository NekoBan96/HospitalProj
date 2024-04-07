import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export function addDevice() {
  const store = useStore();
  const route = useRoute();
  const deviceName = ref("");
  const deviceDescription = ref("");
  const hospitalId = ref("");
  const filePath = ref();
  const isShow = ref(false);
  const files = ref();
  const ErrorDialog = ref(false);
  const addDeviceToDb = async () => {
    try {
      const formData = new FormData();
      const file = new FormData();
      hospitalId.value = route.params.id;
      if (
        deviceName.value === "" ||
        deviceDescription.value === "" ||
        hospitalId.value === ""
      ) {
        return 1;
      }
      formData.append("deviceName", deviceName.value);
      formData.append("deviceDescription", deviceDescription.value);
      formData.append("hospitalId", hospitalId.value);
      if (files.value[0]) {
        const response = await axios.post(
          "http://localhost:5000/db/adddevice",
          formData,
          {
            headers: {
              Authorization: store.getters.getToken,
            },
          }
        );
        file.append("file", files.value[0]);
        file.append("fileExtension", files.value[0].name.split('.')[1]);
        file.append("id", response.data.id);
        console.log([...file.entries()]);
        const fileResponse = await axios.post(
          "http://localhost:5000/upload/device",
          file,
          {
            headers: {
              Authorization: store.getters.getToken,
            },
          }
        );
        response.status === 201
          ? (isShow.value = true)
          : (isShow.value = false);
      }
    } catch (error) {
      ErrorDialog.value = true;
      console.log(error);
    }
  };
  return {
    deviceName,
    deviceDescription,
    hospitalId,
    filePath,
    addDeviceToDb,
    isShow,
    files,
    ErrorDialog,
  };
}
