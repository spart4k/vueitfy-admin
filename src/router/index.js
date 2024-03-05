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
import CorporateCardsView from '@/views/CorporateCardsView.vue'
import MainView from '@/views/MainView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
//import TestTs from '@/views/testts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MainView,
    children: [
      {
        name: 'main/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        children: [
          {
            name: 'main/:id/add',
            path: 'add',
            meta: {
              mode: ['edit', 'zayavka-add'],
            },
            component: Detail,
          },
          {
            name: 'main/:id/:form_id',
            path: ':form_id',
            meta: {
              mode: ['edit', 'zayavka-edit', 'personal-target-edit'],
            },
            component: Detail,
          },
        ],
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
        //mode: ['edit'],
        meta: {
          mode: ['edit'],
        },
        children: [
          {
            name: 'tasks/:id/add',
            path: 'add',
            meta: {
              mode: ['edit', 'zayavka-add'],
            },
            component: Detail,
          },
          {
            name: 'tasks/:id/:form_id',
            path: ':form_id',
            meta: {
              mode: ['edit', 'zayavka-edit'],
            },
            component: Detail,
          },
        ],
        component: Detail,
      },
    ],
  },
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
        name: 'payment-add',
        path: 'add',
        meta: {
          mode: ['add-edit-logistic'],
          label: 'Добавить начисление',
        },
        component: Detail,
      },
      {
        name: 'payment-load',
        path: 'load',
        meta: {
          mode: ['load'],
        },
        component: Detail,
      },
      {
        name: 'payment/:id',
        path: ':id',
        meta: {
          mode: ['add-edit-logistic'],
          label: 'Редактировать начисление',
        },
        component: Detail,
        children: [
          {
            name: 'payment/:id/output',
            path: 'output',
            meta: {
              mode: ['add-edit-logistic', 'output'],
              label: 'Редактировать начисление',
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'payment/personal-edit',
        path: ':personal_id',
        meta: {
          mode: ['edit-personal'],
          label: 'Редактировать',
        },
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
          mode: ['edit'],
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
        name: 'personal-direction/:id',
        path: '/personal/direction/:id',
        meta: {
          mode: ['direction'],
          label: 'Изменить направление',
        },
        component: Detail,
      },
      {
        name: 'personal-bind/:id',
        path: '/personal/bind/:id',
        meta: {
          mode: ['bind'],
          label: 'Привязать объект',
        },
        component: Detail,
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
        children: [
          {
            name: 'personal/:id/new_card',
            path: '/personal/:id/new_card',
            meta: {
              mode: ['edit', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
          {
            name: 'personal/:id/:card_id',
            path: '/personal/:id/:card_id',
            meta: {
              mode: ['edit', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
          {
            name: 'personal/:id/:payment',
            path: '/personal/:id/:payment',
            meta: {
              mode: ['edit', 'edit-payment'],
            },
            component: Detail,
          },
          {
            name: 'personal/:id/:zayavka',
            path: '/personal/:id/:zayavka',
            meta: {
              mode: ['edit', 'edit-zayavka'],
            },
            component: Detail,
          },
          {
            name: 'personal/:id/new',
            path: '/personal/:id/new',
            meta: {
              mode: ['edit', 'new'],
            },
            component: Detail,
          },
          {
            name: 'personal/:id/:object_id',
            path: ':object_id',
            meta: {
              mode: ['edit', 'object_id'],
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'personal/:key_id',
        path: '/personal/:key_id',
        meta: {
          mode: ['edit-key'],
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
        name: 'pivot-output',
        path: '/pivot/output',
        meta: {
          mode: ['output'],
          label: 'Выработка',
        },
        component: Detail,
      },
      {
        name: 'pivot-profit',
        path: '/pivot/profit',
        meta: {
          mode: ['profit'],
          label: 'Начислить',
        },
        component: Detail,
      },
      {
        name: 'pivot-edit',
        path: '/pivot/:id',
        meta: {
          mode: ['edit'],
          label: 'Назначение',
        },
        component: Detail,
      },
      {
        name: 'pivot-edit-personal',
        path: '/pivot/:id',
        meta: {
          mode: ['edit-personal'],
          label: 'Персонал',
        },
        component: Detail,
      },
      {
        name: 'pivot-edit-object',
        path: '/pivot/:id',
        meta: {
          mode: ['edit-object'],
          label: 'Объект',
        },
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
      {
        name: 'object/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Объект - редактирование',
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
        name: 'account-add',
        path: '/account/add',
        meta: {
          mode: 'add',
          label: 'Добавление аккаунта',
        },
        component: Detail,
      },
      {
        name: 'account/:id',
        path: ':id',
        component: Detail,
        meta: {
          mode: ['edit'],
          label: 'Редактирования аккаунта',
        },
        children: [
          {
            name: 'account/:id/new_card',
            path: '/account/:id/new_card',
            meta: {
              mode: ['edit', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
          {
            name: 'account/:id/:card_id',
            path: '/account/:id/:card_id',
            meta: {
              mode: ['edit', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
        ],
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
        name: 'zayavka-add',
        path: '/zayavka/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
      {
        name: 'zayavka-load',
        path: 'load',
        meta: {
          mode: ['load'],
        },
        component: Detail,
      },
      {
        name: 'zayavka/:id',
        path: ':id',
        meta: {
          mode: ['id'],
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
    csajdomponent: GrishaView,
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
        name: 'documents-personal-id',
        path: '/documents/personal/:id',
        meta: {
          mode: ['persanalById'],
        },
        component: Detail,
        children: [
          {
            name: 'documents-personal-id-new',
            path: '/documents/personal/:id/new',
            meta: {
              mode: ['persanalById', 'new'],
            },
            component: Detail,
          },
          {
            name: 'documents-personal-id-object_id',
            path: ':object_id',
            meta: {
              mode: ['persanalById', 'object_id'],
            },
            component: Detail,
          },
          // {
          //   name: 'documents-personal-id-new',
          //   path: 'documents/personal/:id/new',
          //   meta: {
          //     mode: ['persanalById', 'object_id'],
          //   },
          //   component: Detail,
          // },
        ],
      },
      {
        name: 'documents/:id',
        path: ':id',
        component: Detail,
      },
    ],
  },
  {
    path: '/slata-report',
    name: 'slata-report',
    meta: {
      layout: 'blank-layout',
    },
    component: SlataReportView,
  },
  {
    path: '/corporate-cards',
    name: 'corporate-cards',
    meta: {
      layout: 'blank-layout',
    },
    component: CorporateCardsView,
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: {
      layout: 'blank-layout',
    },
    component: ScheduleView,
    children: [
      {
        name: 'schedule-add',
        path: '/schedule/add',
        meta: {
          mode: 'add',
        },
        component: Detail,
      },
      {
        name: 'schedule-new',
        path: '/schedule/new',
        meta: {
          mode: 'new',
        },
        component: Detail,
      },
      {
        name: 'schedule-edit',
        path: '/schedule/edit',
        meta: {
          mode: 'edit',
          label: 'Редактирование',
        },
        component: Detail,
      },
      {
        name: 'schedule/:id',
        path: ':id',
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
    component: TestView,
  },
]

// Добавил фикс для варнингов - причина не известна, решение: https://stackoverflow.com/questions/62462276/how-to-solve-avoided-redundant-navigation-to-current-location-error-in-vue
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: './',
  routes,
})

export default router
