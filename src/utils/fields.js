import { v4 as uuidv4 } from 'uuid'

const defaultProperties = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    value: '',
    isShow: true,
    ...properties,
  }
}

const dateField = (properties) => {
  return {
    menu: false,
    type: 'date',
    ...defaultProperties(properties),
  }
}

const stringField = (properties) => {
  return {
    type: 'string',
    ...defaultProperties(properties),
  }
}

const selectField = (properties) => {
  return {
    type: 'select',
    ...defaultProperties(properties),
  }
}

const autocompleteField = (properties) => {
  return {
    type: 'autocomplete',
    value: '',
    loading: false,
    ...defaultProperties(properties),
  }
}

const textareaField = (properties) => {
  return {
    type: 'textarea',
    ...defaultProperties(properties),
  }
}

const datetimeField = (properties) => {
  return {
    menu: false,
    type: 'date',
    ...defaultProperties(properties),
  }
}

const checkboxField = (properties) => {
  return {
    type: 'checkbox',
    ...defaultProperties(properties),
  }
}

const dropZoneField = (properties) => {
  return {
    type: 'dropzone',
    ...defaultProperties(properties),
  }
}

export {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
}
