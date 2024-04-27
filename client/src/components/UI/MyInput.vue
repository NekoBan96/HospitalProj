<template>
  <form class="ml-5 relative" @submit.prevent>
    <p class="dark:text-white">Поиск</p>
    <input
      type="text"
      :value="modelValue"
      @input="updateInput"
      class="bg-transparent outline-none mx-auto w-[340px] dark:text-white h-[40px] lg:px-5 text-[24px] border-b-[1px] border-gray-500 dark:border-white focus:border-blue-600 transition-all duration-300"
      maxlength="100"
      @keyup.enter="$emit('search_request')"
    />
    <img
      src="@/assets/icons/search.svg"
      alt=""
      class="w-5 absolute left-[320px] top-9 cursor-pointer"
      @click="$emit('search_request')"
    />
  </form>
</template>

<script>
import { onMounted, ref, defineEmits } from "vue";

export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  setup(props, { emit }) {
    const updateInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return {
      updateInput,
    };
  },
};
</script>

<style scoped></style>
