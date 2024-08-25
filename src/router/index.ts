import { createRouter, createWebHistory } from 'vue-router'
import CountryView from '../views/CountryView.vue'
import LayoutView from '@/views/country/LayoutView.vue'
import DetailView from '@/views/country/DetailView.vue'
import SportListView from '@/views/country/SportListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country',
      component: CountryView
    },
    {
      path: '/countries/:id',
      name: 'layout-view',
      component: LayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'detail-view',
          component: DetailView,
          props: true
        },
        {
          path: '',
          name: 'sport-list-view',
          component: SportListView,
          props: true
        }
      ]
    }
  ]
})
export default router