import Vue from 'vue'
import VueRouter from 'vue-router'
import PaymentView from '../views/PaymentView.vue'
import PersonalView from '../views/PersonalView.vue'
import PivotView from '../views/PivotView.vue'
import X5importView from '../views/X5importView.vue'
import ObjectView from '../views/ObjectView.vue'
import AccountView from '../views/AccountView.vue'
import ZayavkaView from '../views/ZayavkaView.vue'
import AppointmentsView from '../views/Appointments.vue'
import ShopRequestMagnitView from '../views/Magnit/ShopRequestView.vue'
import ShopRequestMagnitReportView from '../views/Magnit/ShopRequestReportView.vue'
import UserKeysView from '../views/UserKeysView.vue'
import TasksView from '../views/Tasks.vue'

import MailView from '../views/DefaultMails.vue'
import TestView from '@/views/TestView'
import Navbar from '@/views/Navbar'
import LoginView from '@/views/LoginView'
import Detail from '@/components/Table/detail'
import GrishaView from '@/views/GrishaView.vue'
import DocumentView from '@/views/DocumentView.vue'
import SlataReportView from '@/views/SlataReportView.vue'
//import TestTs from '@/views/testts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/payment',
    name: 'payment',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PaymentView,
    children: [
      {
        name: 'payment/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/personal_target',
    name: 'personal_target',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AppointmentsView,
    children: [
      {
        name: 'personal_target-add',
        path: '/personal_target/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
      {
        name: 'personal_target/:id',
        path: ':id',
        meta: {
          mode: 'edit',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PersonalView,
    children: [
      {
        name: 'personal-add',
        path: '/personal/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
        children: [
          {
            name: 'personal-add/:id',
            path: ':id',
            meta: {
              mode: ['add', 'id'],
            },
            component: Detail,
          },
          {
            name: 'personal-add-new',
            path: '/personal/add/new',
            meta: {
              mode: ['add', 'new'],
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'personal-add-key',
        path: '/personal/add-key',
        meta: {
          mode: ['add-key'],
        },
        component: Detail,
      },
      {
        name: 'personal/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/pivot',
    name: 'pivot',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PivotView,
    children: [
      {
        name: 'pivot/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/x5import',
    name: 'x5import',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: X5importView,
    children: [
      {
        name: 'x5import/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/object',
    name: 'object',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ObjectView,
    children: [
      {
        name: 'object/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        component: Detail,
      },
      {
        name: 'object-add',
        path: '/object/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
      {
        name: 'object-appoint',
        path: '/object/appoint',
        meta: {
          mode: ['appoint'],
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AccountView,
    children: [
      {
        name: 'account/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/shop-request-magnit',
    name: 'shop-request-magnit',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopRequestMagnitView,
    children: [
      {
        name: 'shop-request-magnit/upload',
        path: './upload',
        meta: {
          mode: 'upload',
        },
        component: Detail,
      },
      {
        name: 'shop-request-magnit-add',
        path: '/shop-request-magnit/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
      {
        name: 'shop-request-magnit/:id',
        path: ':id',
        component: Detail,
      },
      {
        name: 'shop-request-magnit/upload',
        path: './upload',
        meta: {
          mode: ['upload'],
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/shop-request-magnit-report',
    name: 'shop-request-magnit-report',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopRequestMagnitReportView,
    children: [
      {
        name: 'shop-request-magnit-report/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/user-keys',
    name: 'user-keys',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: UserKeysView,
    children: [
      {
        name: 'user-keys/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TasksView,
    children: [
      {
        name: 'tasks/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/zayavka',
    name: 'zayavka',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ZayavkaView,
    children: [
      {
        name: 'zayavka/:id',
        path: ':id',
        component: Detail,
      },
      {
        name: 'zayavka-add',
        path: '/zayavka/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TestView,
  },
  {
    path: '/navbar',
    name: 'navbar',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Navbar,
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
    meta: {
      layout: 'login-layout',
    },
    component: LoginView,
  },
  {
    path: '/mails',
    name: 'mails',
    meta: {
      layout: 'blank-layout',
    },
    component: MailView,
  },
  {
    path: '/grisha',
    name: 'grisha',
    meta: {
      layout: 'blank-layout',
    },
    component: GrishaView,
  },
  {
    path: '/documents',
    name: 'documents',
    meta: {
      layout: 'blank-layout',
    },
    component: DocumentView,
    children: [
      {
        name: 'documents-query',
        path: '/documents/query',
        meta: {
          mode: ['query'],
        },
        component: Detail,
      },
      {
        name: 'documents/:id',
        path: ':id',
        component: Detail,
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/slata-report',
    name: 'slata-report',
    meta: {
      layout: 'blank-layout',
    },
    component: SlataReportView,
    // children: [
    //   {
    //     name: 'slata',
    //     path: '/salta',
    //     meta: {
    //       mode: 'blank-layout',
    //     },
    //     component: Detail,
    //   },
    // ],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: './',
  routes,
})

export default router
