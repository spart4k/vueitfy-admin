import { v4 as uuidv4 } from 'uuid'

const dateField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    menu: false,
    disable: false,
    type: 'date',
    value: '',
    ...properties,
  }
}

const stringField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    type: 'string',
    value: '',
    ...properties,
  }
}

const selectField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    type: 'select',
    value: '',
    ...properties,
  }
}

const autocompleteField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    type: 'autocomplete',
    value: '',
    loading: false,
    ...properties,
  }
}

const textareaField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    type: 'textarea',
    value: '',
    ...properties,
  }
}

const datetimeField = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    menu: false,
    disable: false,
    type: 'date',
    value: '',
    ...properties,
  }
}

export {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
}
