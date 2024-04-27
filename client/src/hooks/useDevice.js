import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
export function useDevices() {
  const devices = ref([]);
  const typeOfReq = ref(0) // 0 - loading  1 - loaded  2 - error
  const sortedByRouteIdDevices = ref([]);
  const route = useRoute();
  const limit = ref(10);
  const totalPages = ref();
  const currentPage = ref(1); 
  const toast = useToast();
  const loadDevices = async () => {
    try {
      const allDevices = await axios.get(
        `http://localhost:5000/db/getalldevices`,
        {
          params: {
            id: route.params.id,
          },
        }
      );
      devices.value = allDevices.data;
      totalPages.value = Math.ceil(allDevices.data.length / limit.value);
      sortedByRouteIdDevices.value = (
        await axios.get(
          `http://localhost:5000/db/getdevicebyhospitalid?=${currentPage.value}`,
          {
            params: {
              id: route.params.id,
              page: currentPage.value,
            },
          }
        )
      ).data;
      typeOfReq.value = 1
    } catch (error) {
      console.log(error);
      toast.error("Произошла какая-то ошибка...", {
        timeout: 2000,
      });
    }
  };

  onMounted(loadDevices);

  return {
    devices,
    sortedByRouteIdDevices,
    currentPage,
    totalPages,
    loadDevices,
    typeOfReq,
  };
}
