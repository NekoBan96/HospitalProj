<template>
    <transition name="fade">
        <div v-if="isShow" class="absolute w-full bg-teal-500 flex items-center justify-center">
            <slot> </slot>
        </div>
    </transition>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'MyDialog',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {

        const toggleDialog = () => {
            emit('update:isShow', false);
        };

        const isShowComputed = computed(() => {
            if (props.isShow === true) {
                setTimeout(() => {
                    emit('update:isShow', false);
                }, 4000);
            } else {

            }
            return props.isShow;
        });

        return {
            isShow: isShowComputed,
            toggleDialog
        };
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>