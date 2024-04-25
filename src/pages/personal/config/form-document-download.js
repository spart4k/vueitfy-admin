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
    { alias: 'mvd', filter: [] },
    { alias: 'juridical_person', filter: [] },
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
    { alias: 'medical_insurance', filter: [] },
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
      validations: {},
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
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
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
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      bootstrapClass: [''],
      filter: [
        {
          field: 'regions_id',
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
      validations: {},
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
        conditions: [{ field: 'document_id', value: [4, 5] }],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label:
        'Исполнитель обязуется оказать услуги по выкладке товара, а также услуги по',
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
        conditions: [{ field: 'document_id', value: [1, 3, 4, 5] }],
        location: [
          { field: 'document_id', value: [1], index: 7 },
          { field: 'document_id', value: [3], index: 4 },
          { field: 'document_id', value: [4], index: 6 },
          { field: 'document_id', value: [5], index: 6 },
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
        ],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
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
        conditions: [{ field: 'document_id', value: [1, 3] }],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
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
        conditions: [{ field: 'document_id', value: [1, 3, 4] }],
        label: [
          {
            field: 'document_id',
            value: [1],
            label:
              '3.2. Профессия (специальность, должность, вид трудовой деятельности) по трудовому или гражданско-правовому договору',
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
      validations: {},
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
        conditions: [{ field: 'document_id', value: [1, 2, 3, 5] }],
        location: [
          { field: 'document_id', value: [1], index: 12 },
          { field: 'document_id', value: [2], index: 5 },
          { field: 'document_id', value: [3], index: 12 },
          { field: 'document_id', value: [5], index: 12 },
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
            value: [3],
            label:
              '3.4. Адрес места осуществления трудовой деятельности принятого на работу иностранного гражданина (лица без гражданства)',
          },
          {
            field: 'document_id',
            value: [5],
            label: '1.2 Сети магазина',
          },
        ],
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
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
      bootstrapClass: [''],
    }),
    checkboxField({
      label:
        'Трудовой договор или гражданско-правовой договор прекращен (расторгнут) по инициативе иностранного гражданина (лица без гражданства)',
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
      validations: {},
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
}
