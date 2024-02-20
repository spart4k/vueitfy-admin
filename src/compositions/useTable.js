import { ref } from 'vue'

//свойства ключей конфига
const _keysConfigProperty = {
  SELECTOR: 'selector',
  OPTIONS: 'options',
  PANEL: 'panel',
  HEAD: 'head',
  DATA: 'data',
  DETAIL: 'detail',
  FILTER: 'filter',
}

//значения конфига по умолчанию
const _valuesConfigDefault = {
  [_keysConfigProperty.SELECTOR]: '#mainTable',
  [_keysConfigProperty.OPTIONS]: {
    selecting: true,
    search: {
      function: () => {},
    },
    headerFixed: true,
    title: 'This is an about page1',
  },
  [_keysConfigProperty.PANEL]: {
    buttons: [],
    filters: true,
    search: true,
    date: true,
    addedItemsChildrenType: 'object',
  },
  [_keysConfigProperty.HEAD]: [
    {
      type: 'default',
      isShow: true,
      width: '200',
      changeable: true,
      fixed: {
        value: true,
        position: 'left',
      },
      search: {
        field: '',
        isShow: true,
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
    },
  ],
  [_keysConfigProperty.DATA]: {
    rows: [],
    totalRows: null,
    pageLength: 20,
    currentPage: 1,
    totalPages: null,
    footer: null,
  },
  [_keysConfigProperty.DETAIL]: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '1000px',
    method: 'get',
    name: 'Основная',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    // tabs: defaultForm,
  },
  [_keysConfigProperty.FILTER]: {},
}

const _isObject = (obj) =>
  Object.prototype.toString.call(obj) === '[object Object]'

/**
 * Module for creating and inheriting default configuration options.
 * @param Object options - Initial configuration options.
 * @returns Object - An object with a method to generate general configuration.
 */
export default (options) => {
  const generalConfig = () => {
    // Модуль appConfig
    const appConfig = (function (initialConfig) {
      const config = initialConfig

      const _inheriatGeneralDefaultConfig = () => {
        for (const _keyConfigValue of Object.values(_keysConfigProperty)) {
          const valueConfigDefault = _valuesConfigDefault[_keyConfigValue]
          if (_isObject(valueConfigDefault)) {
            config[_keyConfigValue] = {
              ...valueConfigDefault,
              ...config[_keyConfigValue],
            }
          } else {
            //тут нужна проверка елси данне null, ''
            //возрощают false тогда выводи значение по умтолчаинию
            //config[_keyConfigValue] = valueConfigDefault
          }
        }
      }

      const _inheriatHeadDefaultConfig = () => {
        const keyHeadConfig = _keysConfigProperty.HEAD
        const valuesHeadConfig = config[keyHeadConfig]

        for (let [key, value] of Object.entries(valuesHeadConfig)) {
          valuesHeadConfig[key] = {
            ..._valuesConfigDefault[keyHeadConfig][0],
            ...value,
          }
        }
      }

      return {
        createConfig() {
          for (const _keyConfigValue of Object.values(_keysConfigProperty)) {
            if (!Object.keys(config).includes(_keyConfigValue)) {
              const valueConfigDefault = _valuesConfigDefault[_keyConfigValue]
              config[_keyConfigValue] = valueConfigDefault
            }
          }
          return this
        },
        inheriatDefaultConfig() {
          _inheriatGeneralDefaultConfig()
          _inheriatHeadDefaultConfig()
          return this
        },
        getConfig() {
          return config
        },
      }
    })(options)

    return appConfig.createConfig().inheriatDefaultConfig().getConfig()
  }

  return {
    generalConfig,
  }
}
