import { v4 as uuidv4 } from 'uuid'

const defaultProperties = (properties) => {
  return {
    id: uuidv4(),
    disable: false,
    color: 'primary',
    text: '',
    icon: '',
    ...properties,
  }
}

const stringAction = (properties) => {
  return {
    type: 'string',
    ...defaultProperties(properties),
  }
}

export { stringAction }
