import Vue from 'vue'
import VueRouter from 'vue-router'
import PaymentView from '../views/PaymentView.vue'
import PaymentListView from '../views/PaymentListView.vue'
import PaymentListPersonalView from '../components/PaymentList/personal/index.vue'
import PersonalView from '../views/PersonalView.vue'
import RealtyView from '../views/RealtyView.vue'
import PivotView from '../views/PivotView.vue'
import Pivotx5View from '../views/Pivotx5View.vue'
import PivotPaymentView from '../views/PivotPaymentView.vue'
import X5importView from '../views/X5importView.vue'
import ObjectView from '../views/ObjectView.vue'
import AccountView from '../views/AccountView.vue'
import ZayavkaView from '../views/ZayavkaView.vue'
import AppointmentsView from '../views/Appointments.vue'
import ShopRequestMagnitView from '../views/Magnit/ShopRequestView.vue'
import ShopRequestMagnitReportView from '../views/Magnit/ShopRequestReportView.vue'
import UserKeysView from '../views/UserKeysView.vue'
import TasksView from '../views/Tasks.vue'
import ReportTaxiView from '../views/ReportTaxiView.vue'
import HabitationView from '../views/HabitationView.vue'
import BankView from '../views/BankView.vue'
import JurFaceView from '../views/JurFaceView.vue'
import MvdView from '../views/MvdView.vue'
import ServiceView from '../views/ServiceView.vue'
import RashodCategoryView from '../views/RashodCategoryView.vue'
import RashodVidView from '../views/RashodVidView.vue'
import OfficeView from '../views/OfficeView.vue'

import MailView from '../views/DefaultMails.vue'
import Navbar from '@/views/Navbar'
import LoginView from '@/views/LoginView'
import Detail from '@/components/Table/detail'
import DocumentView from '@/views/DocumentView.vue'
import SlataReportView from '@/views/SlataReportView.vue'
import CorporateCardsView from '@/views/CorporateCardsView.vue'
import MainView from '@/views/MainView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
//import TestTs from '@/views/testts'
// import GanttaView from '@/views/GanttaView.vue'

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
  // {
  //   path: '/vacations',
  //   name: 'vacations',
  //   meta: {
  //     layout: 'blank-layout',
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: GanttaView,
  // },
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
        name: 'payment-load',
        path: 'load',
        meta: {
          mode: ['load'],
        },
        component: Detail,
      },
      // {
      //   name: 'payment/personal-edit',
      //   path: ':personal_id',
      //   meta: {
      //     mode: ['edit-personal'],
      //     label: 'Редактировать',
      //   },
      //   component: Detail,
      // },
      {
        name: 'payment-personal',
        path: '/payment/:id',
        meta: {
          mode: ['personal'],
          label: 'Персонал',
        },
        component: Detail,
        children: [
          {
            name: 'payment-personal/:payment',
            path: '/payment/:id/:payment',
            meta: {
              mode: ['personal', 'personal-payment'],
            },
            component: Detail,
          },
          {
            name: 'payment-personal/:zayavka',
            path: '/payment/:id/:zayavka',
            meta: {
              mode: ['personal', 'personal-zayavka'],
            },
            component: Detail,
          },
        ],
      },
    ],
  },
  {
    path: '/payment_list',
    name: 'payment_list',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PaymentListView,
    children: [
      {
        name: 'payment_list/export',
        path: 'export',
        meta: {
          mode: ['export'],
          label: 'Экспорт ЗП',
        },
        component: Detail,
      },
      {
        name: 'payment_list/:object',
        path: ':object',
        meta: {
          label: 'Добавить начисление',
        },
        component: PaymentListPersonalView,
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
    path: '/office',
    name: 'office',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OfficeView,
    children: [
      {
        name: 'office-add',
        path: '/office/add',
        meta: {
          mode: ['add'],
        },
        component: Detail,
      },
      {
        name: 'office/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        children: [
          {
            name: 'office/:id/:zayavka',
            path: ':zayavka',
            meta: {
              mode: ['edit', 'office-zayavka'],
            },
            component: Detail,
          },
        ],
        component: Detail,
      },
      {
        name: 'office/:office_id',
        path: ':office_id',
        meta: {
          mode: ['target'],
          label: 'Назначить',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/realty',
    name: 'realty',
    meta: {
      layout: 'blank-layout',
    },
    component: RealtyView,
    children: [
      {
        name: 'realty/add',
        path: '/realty/add',
        meta: {
          mode: ['add'],
          label: 'Добавить недвижимость',
        },
        component: Detail,
      },
      {
        name: 'realty/:id',
        path: '/realty/:id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать недвижимость',
        },
        children: [
          {
            name: 'realty/:id/:zayavka',
            path: ':zayavka',
            meta: {
              mode: ['edit', 'realty-zayavka'],
            },
            component: Detail,
          },
        ],
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
              label: 'Начисление',
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
            path: '/personal/:id/:object_id',
            meta: {
              mode: ['edit', 'object_id'],
            },
            component: Detail,
          },
          {
            name: 'personal/:id/edit_habitation',
            path: 'edit_habitation',
            meta: {
              mode: ['edit', 'edit_habitation'],
            },
            component: Detail,
          },
          {
            name: 'personal/:id/add-x5',
            path: '/personal/:id/add-x5',
            meta: {
              mode: ['edit', 'add-x5'],
              label: 'ID X5',
            },
            component: Detail,
          },
          {
            name: 'personal/:id/:x5',
            path: '/personal/:id/:x5',
            meta: {
              mode: ['edit', 'edit-x5'],
              label: 'ID X5',
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
        name: 'pivot-profit-cleaning',
        path: '/pivot/profit-cleaning',
        meta: {
          mode: ['profit-cleaning'],
          label: 'Начислить',
        },
        component: Detail,
      },
      {
        name: 'write-c3',
        path: '/pivot/write-c3',
        meta: {
          mode: ['write-c3'],
          label: 'Печать СЗ',
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
        name: 'pivot-personal',
        path: '/pivot/:id',
        meta: {
          mode: ['personal'],
          label: 'Персонал',
        },
        component: Detail,
        children: [
          {
            name: 'pivot-personal/:payment',
            path: '/pivot/:id/:payment',
            meta: {
              mode: ['personal', 'personal-payment'],
              label: 'Начисление',
            },
            component: Detail,
          },
          {
            name: 'pivot-personal/:zayavka',
            path: '/pivot/:id/:zayavka',
            meta: {
              mode: ['personal', 'personal-zayavka'],
              label: 'Заявка',
            },
            component: Detail,
          },
          {
            name: 'pivot-personal/:scan',
            path: '/pivot/:id/:scan',
            meta: {
              mode: ['personal', 'personal-scan'],
              label: 'Скан',
            },
            component: Detail,
          },
          {
            name: 'pivot-personal/:card',
            path: '/pivot/:id/:card',
            meta: {
              mode: ['personal', 'personal-card'],
              label: 'Банковская карта',
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'pivot-object',
        path: '/pivot/:id',
        meta: {
          mode: ['object'],
          label: 'Объект',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/pivotx5',
    name: 'pivotx5',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Pivotx5View,
  },
  {
    path: '/pivot_payment',
    name: 'pivot_payment',
    meta: {
      layout: 'blank-layout',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PivotPaymentView,
    children: [
      {
        name: 'pivot_payment-edit',
        path: '/pivot_payment/:id',
        meta: {
          mode: ['edit'],
          label: 'Начисление',
        },
        component: Detail,
      },
      {
        name: 'pivot_payment-personal',
        path: '/pivot_payment/:id',
        meta: {
          mode: ['personal'],
          label: 'Персонал',
        },
        component: Detail,
        children: [
          {
            name: 'pivot_payment-personal/:payment',
            path: '/pivot_payment/:id/:payment',
            meta: {
              mode: ['personal', 'personal-payment'],
              label: 'Начисление',
            },
            component: Detail,
          },
          {
            name: 'pivot_payment-personal/:zayavka',
            path: '/pivot_payment/:id/:zayavka',
            meta: {
              mode: ['personal', 'personal-zayavka'],
              label: 'Заявка на расход',
            },
            component: Detail,
          },
          {
            name: 'pivot_payment-personal/:scan',
            path: '/pivot_payment/:id/:scan',
            meta: {
              mode: ['personal', 'personal-scan'],
              label: 'Скан',
            },
            component: Detail,
          },
          {
            name: 'pivot_payment-personal/:card',
            path: '/pivot_payment/:id/:card',
            meta: {
              mode: ['personal', 'personal-card'],
              label: 'Банковская карта',
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'pivot_payment-object',
        path: '/pivot_payment/:id',
        meta: {
          mode: ['object'],
          label: 'Объект',
        },
        component: Detail,
      },
      {
        name: 'pivot_payment-account',
        path: '/pivot_payment/:id',
        meta: {
          mode: ['account'],
          label: 'Аккаунт',
        },
        component: Detail,
        children: [
          {
            name: 'pivot_payment-account/:card_id',
            path: '/pivot_payment/:id/:card_id',
            meta: {
              mode: ['account', 'new_card'],
              label: 'Банковская карта',
            },
            component: Detail,
          },
          {
            name: 'pivot_payment-account/new_card',
            path: '/pivot_payment/:id/new_card',
            meta: {
              mode: ['account', 'new_card'],
              label: 'Банковская карта',
            },
            component: Detail,
          },
        ],
      },
      {
        name: 'pivot_payment-output',
        path: '/pivot_payment/output',
        meta: {
          mode: ['output'],
          label: 'Парсер Х5',
        },
        component: Detail,
      },
      {
        name: 'pivot_payment-zayavka',
        path: '/pivot_payment/zayavka',
        meta: {
          mode: ['zayavka'],
          label: 'Парсер заявок',
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
      {
        name: 'account-add',
        path: '/account/add',
        meta: {
          mode: 'add',
          label: 'Добавление аккаунта',
        },
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
    path: '/report_taxi',
    name: 'report_taxi',
    meta: {
      layout: 'blank-layout',
    },
    component: ReportTaxiView,
    children: [
      {
        name: 'report_taxi-edit',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        component: Detail,
      },
      {
        name: 'report_taxi/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/bank',
    name: 'bank',
    meta: {
      layout: 'blank-layout',
    },
    component: BankView,
    children: [
      {
        name: 'bank/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить банк',
        },
        component: Detail,
      },
      {
        name: 'bank/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать банк',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/jur-face',
    name: 'jur-face',
    meta: {
      layout: 'blank-layout',
    },
    component: JurFaceView,
    children: [
      {
        name: 'jur-face/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить юр. лицо',
        },
        component: Detail,
      },
      {
        name: 'jur-face/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать юр. лицо',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/rashod_vid',
    name: 'rashod_vid',
    meta: {
      layout: 'blank-layout',
    },
    component: RashodVidView,
    children: [
      {
        name: 'rashod_vid/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить расход',
        },
        component: Detail,
      },
      {
        name: 'rashod_vid/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать расход',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/rashod_category',
    name: 'rashod_category',
    meta: {
      layout: 'blank-layout',
    },
    component: RashodCategoryView,
    children: [
      {
        name: 'rashod_category/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить расход',
        },
        component: Detail,
      },
      {
        name: 'rashod_category/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать расход',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/mvd',
    name: 'mvd',
    meta: {
      layout: 'blank-layout',
    },
    component: MvdView,
    children: [
      {
        name: 'mvd/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить МВД',
        },
        component: Detail,
      },
      {
        name: 'mvd/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать МВД',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/service',
    name: 'service',
    meta: {
      layout: 'blank-layout',
    },
    component: ServiceView,
    children: [
      {
        name: 'service/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить сервис',
        },
        component: Detail,
      },
      {
        name: 'service/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать сервис',
        },
        component: Detail,
      },
    ],
  },
  {
    path: '/habitation',
    name: 'habitation',
    meta: {
      layout: 'blank-layout',
    },
    component: HabitationView,
    children: [
      {
        name: 'habitation/add',
        path: 'add',
        meta: {
          mode: ['habitation-add'],
          label: 'Добавить проживание',
        },
        children: [],
        component: Detail,
      },
      {
        name: 'habitation/:habitation_id',
        path: ':habitation_id',
        meta: {
          mode: ['habitation-edit'],
          label: 'Редактировать проживание',
        },
        children: [
          {
            name: 'habitation/:habitation_id/add-owner',
            path: 'add-owner',
            meta: {
              mode: ['habitation-edit', 'habitation-owner-add'],
              label: 'Добавить владельца',
            },
            component: Detail,
          },
          {
            name: 'habitation/:habitation_id/add-realtor',
            path: 'add-realtor',
            meta: {
              mode: ['habitation-edit', 'habitation-realtor-add'],
              label: 'Добавить риэлтора',
            },
            component: Detail,
          },
          {
            name: 'habitation/:habitation_id/:zayavka',
            path: ':zayavka',
            meta: {
              mode: ['habitation-edit', 'habitation-zayavka-edit'],
            },
            component: Detail,
          },
        ],
        component: Detail,
      },
      {
        name: 'habitation-add-owner',
        path: 'add-owner',
        meta: {
          mode: ['habitation-owner-add'],
          label: 'Добавить владельца',
        },
        component: Detail,
      },
      {
        name: 'habitation/:owner_id',
        path: ':owner_id',
        meta: {
          mode: ['habitation-owner-edit'],
          label: 'Редактировать владельца',
        },
        children: [
          {
            name: 'habitation/:owner_id/:card_id',
            path: ':card_id',
            meta: {
              mode: ['habitation-owner-edit', 'new_card'],
            },
            component: Detail,
          },
          {
            name: 'habitation/:owner_id/add',
            path: 'add',
            meta: {
              mode: ['habitation-owner-edit', 'add'],
            },
            component: Detail,
          },
          {
            name: 'habitation/:owner_id/:zayavka',
            path: ':zayavka',
            meta: {
              mode: ['habitation-owner-edit', 'habitation-zayavka-edit'],
            },
            component: Detail,
          },
        ],
        component: Detail,
      },
      {
        name: 'habitation-add-realtor',
        path: 'add-realtor',
        meta: {
          mode: ['habitation-realtor-add'],
          label: 'Добавить риэлтора',
        },
        component: Detail,
      },
      {
        name: 'habitation/:realtor_id',
        path: ':realtor_id',
        meta: {
          mode: ['habitation-realtor-edit'],
          label: 'Редактировать риэлтора',
        },
        children: [
          {
            name: 'habitation/:realtor_id/:card_id',
            path: ':card_id',
            meta: {
              mode: ['habitation-realtor-edit', 'new_card'],
            },
            component: Detail,
          },
          {
            name: 'habitation/:realtor_id/add',
            path: 'add',
            meta: {
              mode: ['habitation-realtor-edit', 'add'],
            },
            component: Detail,
          },
          {
            name: 'habitation/:realtor_id/:zayavka',
            path: ':zayavka',
            meta: {
              mode: ['habitation-realtor-edit', 'habitation-zayavka-edit'],
            },
            component: Detail,
          },
        ],
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
    path: '/documents',
    name: 'documents',
    meta: {
      layout: 'blank-layout',
    },
    component: DocumentView,
    children: [
      {
        name: 'documents/query',
        path: '/documents/query',
        meta: {
          mode: ['query'],
        },
        component: Detail,
      },
      {
        name: 'documents/:id',
        path: '/documents/:id',
        meta: {
          mode: ['personal'],
          label: 'Персонал',
        },
        component: Detail,
        children: [
          {
            name: 'documents/:id/new_card',
            path: '/documents/:id/new_card',
            meta: {
              mode: ['personal', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
          {
            name: 'documents/:id/:card_id',
            path: '/documents/:id/:card_id',
            meta: {
              mode: ['personal', 'new_card'],
              // label: 'Добавить аккаунта',
            },
            component: Detail,
          },
          {
            name: 'documents/:id/:payment',
            path: '/documents/:id/:payment',
            meta: {
              mode: ['personal', 'personal-payment'],
            },
            component: Detail,
          },
          {
            name: 'documents/:id/:zayavka',
            path: '/documents/:id/:zayavka',
            meta: {
              mode: ['personal', 'personal-zayavka'],
            },
            component: Detail,
          },
          {
            name: 'documents/:id/new',
            path: '/documents/:id/new',
            meta: {
              mode: ['personal', 'new'],
            },
            component: Detail,
          },
          {
            name: 'documents/:id/:object_id',
            path: '/documents/:id/:object_id',
            meta: {
              mode: ['personal', 'object_id'],
            },
            component: Detail,
          },
          {
            name: 'documents/:id/edit_habitation',
            path: 'edit_habitation',
            meta: {
              mode: ['personal', 'edit_habitation'],
            },
            component: Detail,
          },

          // {
          //   name: 'documents/:id/new_card',
          //   path: '/documents/:id/new_card',
          //   meta: {
          //     mode: ['personal', 'new_card'],
          //     // label: 'Добавить аккаунта',
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/:card_id',
          //   path: '/documents/:id/:card_id',
          //   meta: {
          //     mode: ['personal', 'new_card'],
          //     // label: 'Добавить аккаунта',
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/new',
          //   path: '/documents/:id/new',
          //   meta: {
          //     mode: ['personal', 'new'],
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/:object_id',
          //   path: '/documents/:id/:object_id',
          //   meta: {
          //     mode: ['personal', 'object_id'],
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/edit_habitation',
          //   path: '/documents/:id/edit_habitation',
          //   meta: {
          //     mode: ['personal', 'edit_habitation'],
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/:payment',
          //   path: '/documents/:id/:payment',
          //   meta: {
          //     mode: ['personal', 'personal-payment'],
          //   },
          //   component: Detail,
          // },
          // {
          //   name: 'documents/:id/:zayavka',
          //   path: '/documents/:id/:zayavka',
          //   meta: {
          //     mode: ['personal', 'personal-zayavka'],
          //   },
          //   component: Detail,
          // },
        ],
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
    children: [
      {
        name: 'corporate-cards/add',
        path: 'add',
        meta: {
          mode: ['add'],
          label: 'Добавить карту',
        },
        component: Detail,
      },
      {
        name: 'corporate-cards/:card_id',
        path: ':card_id',
        meta: {
          mode: ['give'],
          label: 'Выдать карту',
        },
        component: Detail,
      },
      {
        name: 'corporate-cards/:id',
        path: ':id',
        meta: {
          mode: ['edit'],
          label: 'Редактировать карту',
        },
        component: Detail,
      },
      {
        name: 'corporate-cards/:history_id',
        path: ':history_id',
        meta: {
          mode: ['history'],
          label: 'История',
        },
        component: Detail,
      },
    ],
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
