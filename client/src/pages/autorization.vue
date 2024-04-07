<template>

    <body class="dark:bg-[#002137e5] overflow-x-hidden font-body bg-[#F1F1F1]">
        <Header> </Header>
        <main class="h-screen flex flex-col justify-center items-center">
            <div class="flex flex-col items-center shadow-2xl rounded-2xl w-[700px] h-[400px] dark:bg-gray-800 m-5">
                <div class="flex justify-start items-center mt-[50px]">
                    <h1 class="text-[25px] font-bold dark:text-white">Вход</h1>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col justify-center">
                        <span class="dark:text-white">Логин</span>
                        <FormInput v-model="email"> </FormInput>
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="dark:text-white">Пароль</span>
                        <FormInput type="password" v-model="password"> </FormInput>
                    </div>
                </div>
                <div class="mt-[40px]">
                    <MyButton @click="login">Войти</MyButton>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </body>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import autorization from '@/hooks/autorization.js'

const {email, password, login}  = autorization()
</script>
