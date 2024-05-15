import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Тарифы',
  type: 'FormRates',
  detail: true,
  alias: 'object',
  active: false,
  isShow: {
    value: true,
    condition: [
      {
        permissions: [7],
        type: false,
      },
    ],
  },
  actions: [
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: '',
      name: 'saveForm',
      nextForm: true,
    }),
  ],
}
