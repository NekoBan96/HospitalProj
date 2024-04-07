<template>
    <input type="text" :value="modelValue" @input="updateInput"
        class="border-[1px] border-black sm:w-[430px] h-[55px] outline-none px-2 rounded-[15px] text-[20px] w-[300px] text-black"
        maxlength="100">
</template>

<script>
import { onMounted, ref, defineEmits } from 'vue';
export default {
    name: 'FormInput',
    props: {
        modelValue: [String, Number]
    },
    setup(props, { emit }) {
        const updateInput = (event) => {
            emit('update:modelValue', event.target.value);
        }
        return {
            updateInput
        }
    }
}
</script>

<style scoped></style>