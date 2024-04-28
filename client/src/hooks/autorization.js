import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default function autorization() {
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const store = useStore();
  const toast = useToast();
  const login = async () => {
    try {
      if (email.value === "" || password.value === "") {
        toast.warning("Заполните все поля!", {
          timeout: 2000,
        });
        return;
      }
      const response = await axios.get("http://localhost:5000/user/login", {
        params: {
          login: email.value,
          password: password.value,
        },
      });
      if (response.status === 200) {
        store.commit("setAuth", true);
        store.commit("setToken", `Bearer ${response.data.token}`);
        router.push("/");
      }
    } catch (error) {
      console.error("Ошибка при авторизации: ", error.response);
      try {
        if (error.response.data.message === "Неверный логин или пароль") {
          toast.error("Неверный логин или пароль", {
            timeout: 2000,
          });
        } else {
          toast.error("Произошла какая-то ошибка", {
            timeout: 2000,
          });
        }
      } catch (error) {}
    }
  };

  return {
    email,
    password,
    login,
  };
}
