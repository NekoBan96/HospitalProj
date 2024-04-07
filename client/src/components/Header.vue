<template>
    <header
        class="flex items-center text-[30px] bg-[#125379] border-b-2 border-b-[#009ee0] justify-around h-[50px] w-full font-body">
        <div>
            <img src="@/assets/flag.png" alt="flag" class="cursor-pointer" @click="flagClicked">
        </div>
        <div class="flex justify-center items-center gap-4">
            <div v-if="isDark === false"><i class="fa-solid fa-toggle-off text-white" @click="toggleDark()"></i></div>
            <div v-else><i class="fa-solid fa-toggle-on" @click="toggleDark()"></i></div>
            <div class="flex justify-center items-center text-[20px] gap-1 cursor-pointer">
                <span class="text-white font-body text-[18px]" @click="$router.push('/login')"
                    v-show="!isAuth">Войти</span>
                <div v-show="isAuth" class="flex items-center gap-2">
                    <span class="text-white font-body text-[18px]"><i class="fa-solid fa-user"
                            v-show="isAuth"></i></span>
                    <h1 class="text-white dark" @click="logout">Выйти</h1>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { useDark, useTimeAgo, useToggle } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import router from '@/router/index.js';

export default {
    setup(props, { emit }) {
        const isDark = useDark();
        const toggleDark = useToggle(isDark);
        const isDarkMode = computed(() => isDark.value === true);
        const route = useRoute();
        const store = useStore();
        const isAuth = store.state.isAuth;
        const flagClicked = () => {
            router.push('/');
            emit('loadHospitals');
        }
        const logout = () => {
            store.commit('setAuth', false)
            location.reload();
        }

        return {
            toggleDark,
            isDark,
            isDarkMode,
            flagClicked,
            isAuth,
            logout
        }
    }
}
</script>

<style scoped></style>