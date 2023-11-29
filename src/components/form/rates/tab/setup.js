import { ref } from 'vue'
import row from '../row/index.vue'
export default {
  name: 'Tab',
  components: {
    row,
  },
  setup(_, ctx) {
    const { emit } = ctx
    const items = ref([
      {
        id: 3,
        key: 'Комплектация «Заморозка»',
        code: '9MSP',
        items: [
          {
            id: 28,
            object_id: 106915,
            service_id: 3,
            name: 'Комплектация «Заморозка»',
            code: '9MSP',
            category: 2,
            price: 1.9,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 4,
        key: 'Комплектация «Прикасса»',
        code: '9MSQ',
        items: [
          {
            id: 29,
            object_id: 106915,
            service_id: 4,
            name: 'Комплектация «Прикасса»',
            code: '9MSQ',
            category: 2,
            price: 1.6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 5,
        key: 'Комплектация «Сухой»',
        code: '9MSJ',
        items: [
          {
            id: 30,
            object_id: 106915,
            service_id: 5,
            name: 'Комплектация «Сухой»',
            code: '9MSJ',
            category: 2,
            price: 1.6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 6,
        key: 'Комплектация «Фреш»',
        code: '9MSK',
        items: [
          {
            id: 33,
            object_id: 106915,
            service_id: 6,
            name: 'Комплектация «Фреш»',
            code: '9MSK',
            category: 2,
            price: 1.6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 7,
        key: 'Комплектация «Фров» (кг)',
        code: '9MSL',
        items: [
          {
            id: 31,
            object_id: 106915,
            service_id: 7,
            name: 'Комплектация «Фров» (кг)',
            code: '9MSL',
            category: 2,
            price: 0,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 8,
        key: 'Комплектация «Фров» (короб)',
        code: '9MSM',
        items: [
          {
            id: 32,
            object_id: 106915,
            service_id: 8,
            name: 'Комплектация «Фров» (короб)',
            code: '9MSM',
            category: 2,
            price: 1.6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 10,
        key: 'Отгрузка посылок ОМНИ',
        code: '9MJN',
        items: [
          {
            id: 35,
            object_id: 106915,
            service_id: 10,
            name: 'Отгрузка посылок ОМНИ',
            code: '9MJN',
            category: 2,
            price: 2,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 11,
        key: 'Размещ в ячей хран «Сух/Алк/Фров»',
        code: '9MSU',
        items: [
          {
            id: 36,
            object_id: 106915,
            service_id: 11,
            name: 'Размещ в ячей хран «Сух/Алк/Фров»',
            code: '9MSU',
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 12,
        key: 'Размещ в ячей хран «Фреш/Заморозка»',
        code: '9MSV',
        items: [
          {
            id: 37,
            object_id: 106915,
            service_id: 12,
            name: 'Размещ в ячей хран «Фреш/Заморозка»',
            code: '9MSV',
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 13,
        key: 'Попол ячеек отбора «Сух/Алк/Фров»',
        code: '9MSS',
        items: [
          {
            id: 38,
            object_id: 106915,
            service_id: 13,
            name: 'Попол ячеек отбора «Сух/Алк/Фров»',
            code: '9MSS',
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 14,
        key: 'Попол ячеек отбора «Фреш/Заморозка»',
        code: '9MST',
        items: [
          {
            id: 39,
            object_id: 106915,
            service_id: 14,
            name: 'Попол ячеек отбора «Фреш/Заморозка»',
            code: '9MST',
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 15,
        key: 'Попаллетная компл «Сух/Алк/Фров»',
        code: '9MSW',
        items: [
          {
            id: 40,
            object_id: 106915,
            service_id: 15,
            name: 'Попаллетная компл «Сух/Алк/Фров»',
            code: '9MSW',
            category: 2,
            price: 9,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 16,
        key: 'Попаллетная компл «Фреш/Заморозка»',
        code: '9MSX',
        items: [
          {
            id: 41,
            object_id: 106915,
            service_id: 16,
            name: 'Попаллетная компл «Фреш/Заморозка»',
            code: '9MSX',
            category: 2,
            price: 9,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 17,
        key: 'Пополнение гравитац «Сух/Алк/Фров»',
        code: '9MIC',
        items: [
          {
            id: 42,
            object_id: 106915,
            service_id: 17,
            name: 'Пополнение гравитац «Сух/Алк/Фров»',
            code: '9MIC',
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 21,
        key: 'Перем пал/перест дроп «Сух/Алк/Фро»',
        code: '9MSY',
        items: [
          {
            id: 43,
            object_id: 106915,
            service_id: 21,
            name: 'Перем пал/перест дроп «Сух/Алк/Фро»',
            code: '9MSY',
            category: 2,
            price: 6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 22,
        key: 'Перем пал/перест дроп «Фреш/Зам»',
        code: '9MSZ',
        items: [
          {
            id: 44,
            object_id: 106915,
            service_id: 22,
            name: 'Перем пал/перест дроп «Фреш/Зам»',
            code: '9MSZ',
            category: 2,
            price: 6,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 35,
        key: 'Приемка вторсырья и тары',
        code: '9MAB',
        items: [
          {
            id: 45,
            object_id: 106915,
            service_id: 35,
            name: 'Приемка вторсырья и тары',
            code: '9MAB',
            category: 2,
            price: 3,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 36,
        key: 'Приемка крупной тары',
        code: '9MAD',
        items: [
          {
            id: 48,
            object_id: 106915,
            service_id: 36,
            name: 'Приемка крупной тары',
            code: '9MAD',
            category: 2,
            price: 3,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 37,
        key: 'Приемка КДК и несист груз',
        code: '9MTH',
        items: [
          {
            id: 49,
            object_id: 106915,
            service_id: 37,
            name: 'Приемка КДК и несист груз',
            code: '9MTH',
            category: 2,
            price: 4,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 44,
        key: 'Покоробочн. пополение «Сух/Алк/Фров/Прикасса»',
        code: '9MUD',
        items: [
          {
            id: 50,
            object_id: 106915,
            service_id: 44,
            name: 'Покоробочн. пополение «Сух/Алк/Фров/Прикасса»',
            code: '9MUD',
            category: 2,
            price: 1.25,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 45,
        key: 'Покоробочн. пополение «Фрэш/Заморозка»',
        code: '9MUE',
        items: [
          {
            id: 51,
            object_id: 106915,
            service_id: 45,
            name: 'Покоробочн. пополение «Фрэш/Заморозка»',
            code: '9MUE',
            category: 2,
            price: 1.25,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 46,
        key: 'ВОЗВРАТ ИД ПОСЛЕ ГР.ПОПОЛНЕНИЯ СУХ/АЛК/ПРИК/ФРОВ',
        code: '9MUF',
        items: [
          {
            id: 52,
            object_id: 106915,
            service_id: 46,
            name: 'ВОЗВРАТ ИД ПОСЛЕ ГР.ПОПОЛНЕНИЯ СУХ/АЛК/ПРИК/ФРОВ',
            code: '9MUF',
            category: 2,
            price: 3,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 47,
        key: 'Возврат паллеты при пополнении коробами_ФРЕШ+Заморозка',
        code: '9MUG',
        items: [
          {
            id: 53,
            object_id: 106915,
            service_id: 47,
            name: 'Возврат паллеты при пополнении коробами_ФРЕШ+Заморозка',
            code: '9MUG',
            category: 2,
            price: 3,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 52,
        key: 'Электропогрузчик',
        code: null,
        items: [
          {
            id: 54,
            object_id: 106915,
            service_id: 52,
            name: 'Электропогрузчик',
            code: null,
            category: 2,
            price: 171.4,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 53,
        key: 'Грузчик РЦ',
        code: null,
        items: [
          {
            id: 234,
            object_id: 106915,
            service_id: 53,
            name: 'Грузчик РЦ',
            code: null,
            category: 2,
            price: 142.85,
            date_active_s: '2023-05-30',
            date_active_po: '2023-05-31',
            active: 1,
          },
          {
            id: 235,
            object_id: 106915,
            service_id: 53,
            name: 'Грузчик РЦ',
            code: null,
            category: 2,
            price: 152.38,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 54,
        key: 'Пресс',
        code: null,
        items: [
          {
            id: 238,
            object_id: 106915,
            service_id: 54,
            name: 'Пресс',
            code: null,
            category: 2,
            price: 161.9,
            date_active_s: '2023-05-30',
            date_active_po: '2023-05-31',
            active: 1,
          },
          {
            id: 239,
            object_id: 106915,
            service_id: 54,
            name: 'Пресс',
            code: null,
            category: 2,
            price: 152.38,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 55,
        key: 'Погрузчик ВС',
        code: null,
        items: [
          {
            id: 57,
            object_id: 106915,
            service_id: 55,
            name: 'Погрузчик ВС',
            code: null,
            category: 2,
            price: 171.4,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 57,
        key: 'Размещение',
        code: null,
        items: [
          {
            id: 58,
            object_id: 106915,
            service_id: 57,
            name: 'Размещение',
            code: null,
            category: 2,
            price: 10,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 66,
        key: 'Кладовщик по браку',
        code: null,
        items: [
          {
            id: 240,
            object_id: 106915,
            service_id: 66,
            name: 'Кладовщик по браку',
            code: null,
            category: 2,
            price: 152.38,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 67,
        key: 'Грузчик ВС',
        code: null,
        items: [
          {
            id: 236,
            object_id: 106915,
            service_id: 67,
            name: 'Грузчик ВС',
            code: null,
            category: 2,
            price: 152.35,
            date_active_s: '2023-05-30',
            date_active_po: '2023-05-31',
            active: 1,
          },
          {
            id: 237,
            object_id: 106915,
            service_id: 67,
            name: 'Грузчик ВС',
            code: null,
            category: 2,
            price: 152.38,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 68,
        key: 'Отгрузка и оптимизации палет',
        code: null,
        items: [
          {
            id: 139,
            object_id: 106915,
            service_id: 68,
            name: 'Отгрузка и оптимизации палет',
            code: null,
            category: 2,
            price: 8,
            date_active_s: '2023-05-30',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 69,
        key: 'Грузчик бины 200',
        code: null,
        items: [
          {
            id: 420,
            object_id: 106915,
            service_id: 69,
            name: 'Грузчик бины 200',
            code: null,
            category: 2,
            price: 65,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
      {
        id: 79,
        key: 'Грузчик бины 400',
        code: null,
        items: [
          {
            id: 421,
            object_id: 106915,
            service_id: 79,
            name: 'Грузчик бины 400',
            code: null,
            category: 2,
            price: 130,
            date_active_s: '2023-06-01',
            date_active_po: '2023-08-31',
            active: 1,
          },
        ],
      },
    ])
    const search = ref('')
    const openDialog = () => {
      emit('openDialog')
    }
    return {
      items,
      search,
      openDialog,
    }
  },
}
