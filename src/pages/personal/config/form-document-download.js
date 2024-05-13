import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Запросить документ',
  type: 'FormDefault',
  path: 'edit',
  alias: 'habitation',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [],
  },
  lists: [
    {
      alias: 'personal_employment',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
    { alias: 'personal_goal_visit', filter: [] },
    { alias: 'mvd', filter: [] },
    { alias: 'juridical_person', filter: [] },
    { alias: 'personal_place_stay', filter: [] },
    { alias: 'personal_residence_permit', filter: [] },
    {
      alias: 'objects_personal',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
    {
      alias: 'personal_doc_type',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
    {
      alias: 'medical_insurance',
      filter: [
        {
          field: 'personal_id',
          value: '',
          routeKey: 'id',
          type: 'num',
        },
      ],
    },
  ],
  fields: [
    selectField({
      label: 'Документ',
      name: 'document_id',
      alias: 'personal_employment',
      requestKey: 'personal_employment_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      dependence: [
        {
          type: 'default',
          fillField: ['profession'],
        },
      ],
      updateList: [
        {
          alias: 'work_activity_type',
          condition: [
            {
              key: 'document_id',
              value: [1],
            },
          ],
          filter: [
            {
              alias: 'conclusion',
              sendEmpty: true,
              value: '',
              type: '',
            },
          ],
        },
        {
          alias: 'work_activity_type',
          condition: [
            {
              key: 'document_id',
              value: [2],
            },
          ],
          filter: [
            {
              alias: 'employment',
              sendEmpty: true,
              value: '',
              type: '',
            },
          ],
        },
        {
          alias: 'work_activity_type',
          condition: [
            {
              key: 'document_id',
              value: [3],
            },
          ],
          filter: [
            {
              alias: 'termination',
              sendEmpty: true,
              value: '',
              type: '',
            },
          ],
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Регион',
      name: 'regions_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      notSend: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5, 6] }],
        label: [
          {
            field: 'document_id',
            value: [4],
            label: 'Регион',
          },
          {
            field: 'document_id',
            value: [5],
            label: 'Регион',
          },
          {
            field: 'document_id',
            value: [6],
            label: 'Регион',
          },
        ],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
      updateList: [
        {
          alias: 'city_id',
          filter: [
            {
              field: 'regions_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Город',
      name: 'city_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5, 6] }],
      },
      bootstrapClass: [''],
      validations: { required },
      filter: [
        {
          field: 'regions',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    }),

    selectField({
      label: 'Настоящее уведомление представляется в',
      name: 'mvd_id',
      alias: 'mvd',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label:
        '6. Дата заключения гражданско-правового договора на выполнение работ (оказание услуг) (указывается в случае заключения в устной форме)',
      name: 'date_gph',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [
          { field: 'work_activity_id', value: [3] },
          { field: 'document_id', value: [2] },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата создания',
      name: 'date_contract',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5, 6] }],
        label: [
          {
            field: 'document_id',
            value: [4],
            label: 'Дата создания',
          },
          {
            field: 'document_id',
            value: [5],
            label: 'Дата создания',
          },
          {
            field: 'document_id',
            value: [6],
            label: 'Дата составления',
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        '1.2 Исполнитель обязуется оказать услуги по выкладке товара, а также услуги по',
      name: 'services',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '1.2. Сведения о работодателе или заказчике работ (услуг)',
      name: 'juridical_person_id',
      alias: 'juridical_person',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 3, 4, 5, 6, 7, 8] }],
        location: [
          { field: 'document_id', value: [1], index: 7 },
          { field: 'document_id', value: [3], index: 4 },
          { field: 'document_id', value: [4], index: 6 },
          { field: 'document_id', value: [5], index: 6 },
          { field: 'document_id', value: [6], index: 6 },
          { field: 'document_id', value: [7], index: 57 },
          { field: 'document_id', value: [8], index: 68 },
        ],
        label: [
          {
            field: 'document_id',
            value: [1],
            label: '1.2. Сведения о работодателе или заказчике работ (услуг)',
          },
          {
            field: 'document_id',
            value: [3],
            label: '1.2. Сведения о работодателе или заказчике работ (услуг)',
          },
          {
            field: 'document_id',
            value: [4],
            label: 'Наименование работодателя',
          },
          {
            field: 'document_id',
            value: [5],
            label: 'Наименование Заказчика',
          },
          {
            field: 'document_id',
            value: [6],
            label: 'Наименование работодателя',
          },
          {
            field: 'document_id',
            value: [7],
            label: 'Наименование организации',
          },
          {
            field: 'document_id',
            value: [8],
            label: '3. Наименование организации',
          },
        ],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '2.7. Документ, удостоверяющий личность',
      name: 'doc_type_id',
      alias: 'personal_doc_type',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 3, 8] }],
        label: [
          {
            field: 'document_id',
            value: [1],
            label: '2.7. Документ, удостоверяющий личность',
          },
          {
            field: 'document_id',
            value: [3],
            label: '2.7. Документ, удостоверяющий личность',
          },
          {
            field: 'document_id',
            value: [8],
            label: '1. Документ, удостоверяющий личность',
          },
        ],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        '3.2. Профессия (специальность, должность, вид трудовой деятельности) по трудовому или гражданско-правовому договору',
      name: 'profession',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3, 4, 8] }],
        location: [
          { field: 'document_id', value: [1], index: 9 },
          { field: 'document_id', value: [2], index: 4 },
          { field: 'document_id', value: [3], index: 9 },
          { field: 'document_id', value: [4], index: 9 },
          { field: 'document_id', value: [5], index: 9 },
          { field: 'document_id', value: [6], index: 9 },
          { field: 'document_id', value: [7], index: 9 },
          { field: 'document_id', value: [8], index: 9 },
        ],
        label: [
          {
            field: 'document_id',
            value: [1],
            label:
              '3.2. Профессия (специальность, должность, вид трудовой деятельности) по трудовому или гражданско-правовому договору',
          },
          {
            field: 'document_id',
            value: [2],
            label: '3. Профессия по трудовому договору',
          },
          {
            field: 'document_id',
            value: [3],
            label:
              '3.2. Профессия (специальность, должность, вид трудовой деятельности) по трудовому или гражданско-правовому договору',
          },
          {
            field: 'document_id',
            value: [4],
            label:
              '1.2 Работодатель предоставляет, а работник соглашается выполнять работу в',
          },
          {
            field: 'document_id',
            value: [8],
            label: '1. Профессия',
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label:
        '3.3. Трудовая деятельность осуществляется иностранным гражданином (лицом без гражданства) на основании',
      name: 'work_activity_id',
      alias: 'work_activity_type',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 3] }],
        location: [
          { field: 'document_id', value: [1], index: 10 },
          { field: 'document_id', value: [2], index: 7 },
          { field: 'document_id', value: [3], index: 10 },
        ],
        label: [
          {
            field: 'document_id',
            value: [1],
            label:
              '3.3. Трудовая деятельность осуществляется иностранным гражданином (лицом без гражданства) на основании',
          },
          {
            field: 'document_id',
            value: [2],
            label:
              '5. Трудовая деятельность осуществляется иностранным гражданином (лицом без гражданства) на основании',
          },
          {
            field: 'document_id',
            value: [3],
            label:
              '3.3. Трудовая деятельность осуществляется иностранным гражданином (лицом без гражданства) на основании',
          },
        ],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label:
        'Дата заключения с иностранным гражданином (лицом без гражданства) трудового договора или гражданско-правового договора на выполнение работ (оказание услуг)',
      name: 'date_conclusion',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label:
        '3.4. Адрес места осуществления трудовой деятельности принятого на работу иностранного гражданина (лица без гражданства)',
      name: 'object_id',
      alias: 'objects_personal',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 2, 5, 6] }],
        location: [
          { field: 'document_id', value: [1], index: 12 },
          { field: 'document_id', value: [2], index: 5 },
          { field: 'document_id', value: [3], index: 12 },
          { field: 'document_id', value: [4], index: 12 },
          { field: 'document_id', value: [5], index: 12 },
          { field: 'document_id', value: [6], index: 12 },
        ],
        label: [
          {
            field: 'document_id',
            value: [1],
            label:
              '3.4. Адрес места осуществления трудовой деятельности принятого на работу иностранного гражданина (лица без гражданства)',
          },
          {
            field: 'document_id',
            value: [2],
            label: '4. Сведения о месте осуществления трудовой деятельности',
          },
          {
            field: 'document_id',
            value: [5],
            label: '1.2 Сети магазина',
          },
          {
            field: 'document_id',
            value: [6],
            label: '4. Обучение проходит в',
          },
        ],
      },
      items: [],
      updateList: [
        {
          alias: 'contract_room_type',
          filter: [
            {
              field: 'object_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '1.2. Тип помещения',
      name: 'room_type_id',
      alias: 'contract_room_type',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    dateField({
      label:
        'Дата прекращения (расторжения) с иностранным гражданином (лицом без гражданства) трудового договора или гражданско-правового договора на выполнение работ (оказание услуг)',
      name: 'date_cancel',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [3] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    checkboxField({
      label:
        '3.4 Трудовой договор или гражданско-правовой договор прекращен (расторгнут) по инициативе иностранного гражданина (лица без гражданства)',
      name: 'is_cancel',
      value: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [3] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата подписания уведомления',
      name: 'date_create',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [1, 3] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    dateField({
      label: 'Дата начала выполнения работ',
      name: 'date_start',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4, 5] }],
        label: [
          {
            field: 'document_id',
            value: [4],
            label: '2.1 Дата начала выполнения работы',
          },
          {
            field: 'document_id',
            value: [5],
            label: '1.4 Срок оказания услуг с',
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: '1.4 Срок оказания услуг по',
      name: 'date_end',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        '2.1.3. Исполнитель допустил отступление от условий договора или технологической карты проведения',
      name: 'service_defect',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '5.2.1 Работнику выплачивается должностной оклад в размере',
      name: 'salary',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [4] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3.1. Цена за единицу руб./час',
      name: 'price',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label:
        '8. Сведения о действующем договоре (полисе) добровольного медицинского  страхования, либо договоре о предоставлении платных медицинских услуг, либо действующем полисе обязательного медицинского страхования:',
      name: 'insurance_id',
      alias: 'medical_insurance',
      requestKey: 'medical_insurance_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [2] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: '1. Дата убытия',
      name: 'date_departure',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: '2. Область',
      name: 'region_id',
      requestKey: 'region_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
    }),

    stringField({
      label: '2. Район',
      name: 'area',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Город или другой населенный пункт',
      name: 'city',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Улица',
      name: 'street',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Дом',
      name: 'house',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Корпус',
      name: 'corpus',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Строение',
      name: 'bilding',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Квартира',
      name: 'flat',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),

    stringField({
      label: '1. Место рождения',
      name: 'birth_place',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '1. Вид и реквизиты документа, подтверждающее право на пребывание',
      name: 'residence_permit_id',
      alias: 'personal_residence_permit',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '1. Цель въезда',
      name: 'personal_goal_visit_id',
      alias: 'personal_goal_visit',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: '1. Дата въезда',
      name: 'date_entry',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: '1. Срок пребывания до',
      name: 'date_stay',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: '1. Адрес прежнего места пребывания в РФ. Регион',
      name: 'region_id_early_location',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      // validations: { required },
    }),
    stringField({
      label: '1. Адрес прежнего места пребывания в РФ. Город, адрес',
      name: 'address_early_location',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: '2. Проживание',
      name: 'habitation_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/habitation',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: '2. Район',
      name: 'area_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Город или другой населенный пункт',
      name: 'city_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Улица',
      name: 'street_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Дом, участок, владение и иное',
      name: 'type_building',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Номер дома, участка, владения',
      name: 'house_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Корпус',
      name: 'corpus_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Строение',
      name: 'bilding_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Квартира, комната, офис и иное',
      name: 'type_habitation',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '2. Номер квартиры, комнаты, офиса и иное',
      name: 'flat_stay',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    selectField({
      label: '2. Место пребывания',
      name: 'personal_place_stay_id',
      alias: 'personal_place_stay',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        '2. Наименование документа, подтверждающего право пользования помещением',
      name: 'bilding_doc_name',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        '2. Реквизиты документа, подтверждающего право пользования помещением',
      name: 'bilding_doc_num',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),

    stringField({
      label: '3. Фамилия',
      name: 'surname',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
      },
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Имя',
      name: 'name_n',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
      },
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Отчество',
      name: 'patronymic',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
      },
      position: {
        cols: 12,
        sm: 4,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Серия паспорта',
      name: 'doc_ser',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Номер паспорта',
      name: 'doc_num',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата выдачи',
      name: 'doc_date',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7, 8] }],
        label: [
          {
            field: 'document_id',
            value: [7],
            label: 'Дата выдачи',
          },
          {
            field: 'document_id',
            value: [8],
            label: '3. Дата выдачи',
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    dateField({
      label: 'Дата выдачи доверенности',
      name: 'date_dover',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Срок действия доверенности',
      name: 'date_dover_active',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [7] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),

    autocompleteField({
      label: '3. Место жительства. Область, край',
      name: 'region_id_recipient',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      validations: { required },
    }),
    stringField({
      label: '3. Район',
      name: 'area_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Город или другой населенный пункт',
      name: 'city_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Улица',
      name: 'street_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Дом',
      name: 'house_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Корпус',
      name: 'corpus_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Строение',
      name: 'bilding_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: '3. Квартира',
      name: 'flat_recipient',
      placeholder: '',
      value: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    dateField({
      label: '3. Заявленный срок пребывания',
      name: 'date_declared_stay',
      type: 'date',
      value: '',
      menu: false,
      placeholder: '',
      class: [''],
      isShow: {
        value: false,
        conditions: [{ field: 'document_id', value: [8] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      color: 'primary',
      module: 'form/create',
      url: 'generation/personal_doc',
      useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
      download: true,
      name: 'createForm',
      action: 'createForm',
    }),
  ],
  isShow: {
    value: true,
    condition: [
      {
        permissions: [16, 19, 4],
        type: true,
      },
    ],
  },
}
