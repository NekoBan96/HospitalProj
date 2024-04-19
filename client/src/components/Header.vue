<template>
  <header
    class="flex items-center text-[30px] bg-[#125379] border-b-2 border-b-[#009ee0] justify-around h-[50px] w-full font-body"
  >
    <div>
      <img
        src="@/assets/flag.png"
        alt="flag"
        class="cursor-pointer"
        @click="flagClicked"
      />
    </div>
    <div class="flex justify-center items-center gap-4">
      <div
        class="flex justify-center items-center text-[20px] gap-1 cursor-pointer"
      >
        <span
          class="text-white font-body text-[18px]"
          @click="$router.push('/login')"
          v-show="!isAuth"
          >Войти</span
        >
        <div v-show="isAuth" class="flex items-center gap-2">
          <span class="text-white font-body text-[18px]"
            ><i class="fa-solid fa-user" v-show="isAuth"></i
          ></span>
          <h1 class="text-white dark" @click="logout">Выйти</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import router from "@/router/index.js";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const isAuth = store.state.isAuth;
    const flagClicked = () => {
      router.push("/");
      emit("loadHospitals");
    };
    const logout = () => {
      store.commit("setAuth", false);
      location.reload();
    };
    return {
      flagClicked,
      isAuth,
      logout,
    };
  },
};
</script>

<style scoped></style>
