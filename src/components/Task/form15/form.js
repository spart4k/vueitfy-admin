import FormDefault from '@/components/Form/default/index.vue'
import { stringAction } from '@/utils/actions'
import _ from 'lodash'
import { editFields } from '@/pages/appointments/index.js'

const editFieldsClone = _.cloneDeep(editFields)

editFieldsClone.forEach((el) => {
  el.readonly = false
})

const config = {
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '600px',
    method: 'get',
    alias: 'personal_target',
    popupIndex: 2,
    url: '/get/form/',
    name: 'Назначения',
    requestId: 'form_id',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        path: 'personal-target-edit',
        lists: [
          { alias: 'vid_vedomost_id_logistic', filter: [] },
          { alias: 'status_pt', filter: [] },
          // { alias: 'object_id_logistic', filter: [] },
          // { alias: 'account_id_logistic', filter: [] },
          { alias: 'direction_id_logistic', filter: [] },
          {
            alias: 'doljnost_id_logistic',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
          { alias: 'shifts', filter: [] },
          { alias: 'nutritions', filter: [] },
          //{
          //  alias: 'account_id',
          //  filter: [],
          //},
          {
            alias: 'print_form_key',
            filter: [
              {
                field: 'object_id',
                value: '',
                source: 'form.formData',
                type: 'num',
              },
              {
                field: 'personal_id',
                value: '',
                source: 'form.formData',
                type: 'num',
              },
            ],
          },
        ],
        routeParam: 'form_id',
        alias: 'personal_target',
        active: false,
        fields: editFieldsClone,
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
            module: 'personal_target/update',
            name: 'saveForm',
            url: 'update/target',
            action: 'saveForm',
            color: 'primary',
            successMessage: false,
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'readonlyAll',
                  target: 'environment',
                  value: [1],
                  type: true,
                },
              ],
            },
          }),
        ],
        formData: {},
      },
    ],
    activeTab: null,
  },
}

export default config
