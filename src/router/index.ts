import { createRouter, createWebHistory } from 'vue-router'
import CountryView from '../views/CountryView.vue'
import LayoutView from '@/views/country/LayoutView.vue'
import DetailView from '@/views/country/DetailView.vue'
import SportListView from '@/views/country/SportListView.vue'
import nProgress from 'nprogress'
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
          path: 'sports',
          name: 'sport-list-view',
          component: SportListView,
          props: true
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0}
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
