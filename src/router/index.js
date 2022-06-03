import Vue from 'vue'
import VueRouter from 'vue-router'
import MetricsView from '../views/MetricsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'metrics',
    component: MetricsView // component yang merender view x
  }
]

const router = new VueRouter({
  routes,
  mode: 'history', // record history page mana yang dibuka terakhir
})

export default router
