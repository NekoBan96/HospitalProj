<template>
  <div>
    <div v-show="typeOfReq === 2 && devices <= 0">
      <h1 class="lg:ml-[370px] text-[25px] font-bold pl-[20px] dark:text-white">
        Произошла какая-то ошибка.
      </h1>
    </div>
    <div v-show="typeOfReq === 0">
      <div class="flex justify-center items-center">
        <SkeletonList> </SkeletonList>
      </div>
    </div>
    <div v-show="devices <= 0 && typeOfReq === 1">
      <h1 class="lg:ml-[370px] text-[25px] font-bold pl-[20px] dark:text-white">
        В данном учреждении нет аппаратов.
      </h1>
    </div>
    <div class="flex flex-col justify-center items-center space-y-4">
      <TransitionGroup name="list" tag="ul">
        <DeviceItem
          v-for="device in devices"
          :device="device"
          :key="device.device_id"
          @deleteDevice="deleteEmit"
          class="mb-3"
        >
        </DeviceItem>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import DeviceItem from "@/components/DeviceItem.vue";
import SkeletonList from "./SkeletonList.vue";
export default {
  components: { DeviceItem, SkeletonList },
  props: {
    devices: {
      type: Array,
      required: true,
    },
    typeOfReq: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    function deleteEmit(id) {
      emit("delete", id);
    }
    return {
      deleteEmit,
    };
  },
};
</script>

<style scoped>
.list-move,

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
