import { createRouter, createWebHistory } from 'vue-router';
import CountryView from '../views/CountryView.vue';
import LayoutView from '@/views/country/LayoutView.vue';
import DetailView from '@/views/country/DetailView.vue';
import SportListView from '@/views/country/SportListView.vue';
import nProgress from 'nprogress';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import AddCountryView from '@/views/country/AddCountryView.vue';
import LoginView from '@/views/authentication/LoginView.vue';
import RegisterView from '@/views/authentication/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country',
      component: CountryView,
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
          props: true,
        },
        {
          path: 'sports',
          name: 'sport-list-view',
          component: SportListView,
          props: true,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/add-country',
      name: 'add-country-view',
      component: AddCountryView,
      props: true,
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(() => {
  nProgress.start(); 
});

router.afterEach(() => {
  nProgress.done(); 
});

export default router;
