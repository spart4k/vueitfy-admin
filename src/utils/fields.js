import { v4 as uuidv4 } from 'uuid'
import { hasBothDate } from './validation'

const defaultProperties = (properties) => {
  return {
    id: uuidv4(),
    readonly: false,
    disable: false,
    value: '',
    isShow: true,
    mode: 'all',
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
const dateRangeField = (properties) => {
  return {
    menu: false,
    type: 'dateRange',
    ...defaultProperties(properties),
    validations: { hasBothDate, ...properties.validations },
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
    hideItems: [],
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

const textBlock = (properties) => {
  return {
    type: 'textBlock',
    ...defaultProperties(properties),
  }
}

const colorPicker = (properties) => {
  return {
    type: 'colorPicker',
    disabled: true,
    ...defaultProperties(properties),
  }
}

const radioPanel = (properties) => {
  return {
    type: 'radioPanel',
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
  textBlock,
  colorPicker,
  radioPanel,
  dateRangeField,
}
