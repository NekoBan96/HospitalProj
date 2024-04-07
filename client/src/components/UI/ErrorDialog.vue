<template>
    <transition name="fade">
        <div v-if="ErrorDialog" class="absolute w-full bg-red-400 flex items-center justify-center">
            <slot> </slot>
        </div>
    </transition>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'ErrorDialog',
    props: {
        ErrorDialog: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {

        const toggleDialog = () => {
            emit('update:ErrorDialog', false);
        };

        const ErrorDialogComputed = computed(() => {
            if (props.ErrorDialog === true) {
                setTimeout(() => {
                    emit('update:ErrorDialog', false);
                }, 4000);
            }
            return props.ErrorDialog; 
        });

        return {
            ErrorDialog: ErrorDialogComputed,
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