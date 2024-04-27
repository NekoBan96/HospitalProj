import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default function autorization() {
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const store = useStore();
  const login = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/login",{
          params:{
            login: email.value,
            password: password.value
          }
        })
      console.log(response);
      if (response.status === 200) {
        store.commit("setAuth", true);
        store.commit("setToken", `Bearer ${response.data.token}`);
        router.push("/");
      }
    } catch (error) {
        console.log(error)
    }
  };

  return {
    email,
    password,
    login,
  };
}
