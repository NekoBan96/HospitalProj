<template>
  <div>
    <div v-if="hospitals <= 0">
      <!-- <h1 class="pl-[50px]">Идет загрузка...</h1> -->
      <SkeletonList> </SkeletonList>
    </div>
    <div v-else class="flex flex-col space-y-4">
      <TransitionGroup name="list" tag="ul">
        <HospitalItem
          v-for="hospital in hospitals"
          :hospital="hospital"
          :key="hospital._id"
          @deleteHospital="deleteEmit"
          class="mb-3"
        >
        </HospitalItem>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import HospitalItem from "@/components/HospitalItem";
import SkeletonList from "@/components/SkeletonList.vue";
export default {
  components: {
    HospitalItem,
    SkeletonList,
  },
  props: {
    hospitals: {
      type: Array,
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
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
