import Vue, { ref, computed, watch, unref, reactive, readonly } from 'vue'
import store from '@/store'
import moment from 'moment'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { stringAction } from '@/utils/actions'

/**
 * @param loading {boolean}
 * @param fields {object}
 * @param watcher {function} - Используется для ленивой подгрузки данных из стора. Должно быть реактивным. Например computed
 * @returns {{$v: *, $invalid: *, reset: *, $errors: *, formData: *, getDataForm: *, validate: *, update: *}}
 */
export default function () {
  const initTableConfig = (config) => {
    const defaultConfig = {
      id: uuidv4(),
      type: 'TableDefault',
      active: false,
    }
    return { ...defaultConfig, ...config }
  }

  const createHeadItem = ({ config, item, index = config.length }) => {
    const template = {
      title: 'title',
      alias: 'alias',
      value: 'value',
      width: '40',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      type: 'default',
      isShow: true,
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      search: {
        field: '',
        isShow: true,
      },
    }
    config.splice(index, 0, { ...template, ...item })
  }

  const convertConfigPanel = ({ config, listHead, listPanel }) => {
    const spliceHeads = (list) => {
      config.head = config.head.flatMap((head) => {
        const { value } = head
        if (list.includes(value)) {
          return head
        } else {
          return []
        }
      })
    }
    const splicePanel = (list) => {
      config.panel.buttons = config.panel.buttons.flatMap((button) => {
        const { label } = button
        if (list.includes(label)) {
          return button
        } else {
          return []
        }
      })
    }
    if (config.filter) {
      config.filter = undefined
    }
    if (listHead) spliceHeads(listHead)
    if (listPanel) splicePanel(listPanel)
  }

  const addCloseButton = (config) => {
    const btn = stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    })
    if (config.actions) config.actions.push(btn)
    else config.actions = [btn]
  }

  const configRouteConvert = ({
    config,
    route,
    newPath,
    settings = { oldPath: '', index: [], exceptName: [] },
  }) => {
    if (route) config.detail.requestId = route
    if (settings.index?.length) {
      settings.index.forEach((item) => {
        if (newPath) config.detail.tabs[item].path = newPath
        if (route) config.detail.tabs[item].routeParam = route
      })
    } else if (settings.oldPath) {
      config.detail.tabs.forEach((item) => {
        if (
          item.path === settings.oldPath &&
          !settings.exceptName?.includes(item.name)
        ) {
          if (newPath) item.path = newPath
          if (route) item.routeParam = route
        }
      })
    }
  }

  return {
    initTableConfig,
    createHeadItem,
    convertConfigPanel,
    addCloseButton,
    configRouteConvert,
  }
}
