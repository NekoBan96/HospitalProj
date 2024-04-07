import MainHopitals from '@/pages/MainHospital.vue'
import Devices from '@/pages/Devices.vue'
import addHospital from '@/pages/addHospital.vue'
import addDevice from '@/pages/addDevice.vue'
import logIn from '@/pages/autorization.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: MainHopitals
    },
    {
        path: '/hospital/',
        component: Devices
    },
    {
        path: '/hospital/:id',
        component: Devices
    },
    {
        path: '/addHospital',
        component: addHospital
    },
    {
        path: '/hospital/:id/addDevice',
        component: addDevice
    },
    {
        path: '/login',
        component: logIn
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;