import Vue from 'vue'
import VueRouter from 'vue-router'
import PaymentView from '../views/PaymentView.vue'
import PersonalView from '../views/PersonalView.vue'
import MailView from '../views/DefaultMails.vue'
import TestView from '@/views/TestView'
import Navbar from '@/views/Navbar'
import TestForm from '@/views/testform'
import Login from '@/views/LoginView'
import Detail from '@/components/Table/detail'
//import TestTs from '@/views/testts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/paymentview',
    name: 'paymentview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PaymentView,
    children: [
      {
        name: 'paymentview/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PersonalView,
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TestView,
  },
  {
    path: '/navbar',
    name: 'navbar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Navbar,
  },
  {
    path: '/testform',
    name: 'TestForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TestForm,
  },
  //{
  //  path: '/testts',
  //  name: 'TestTs',
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: TestTs,
  //},
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/mails',
    name: 'mails',
    component: MailView,
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
