<template>
    <Transition>
        <div class="dialog" v-if="show" @click="hideDialog">
            <div @click.stop class="dialog__content">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin.js";

export default {
    name: 'Modal',
    // mixins: [toggleMixin],
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            console.log(1)
            this.$emit('update:show', false)
        }
    },
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>