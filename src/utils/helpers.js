import useView from '@/compositions/useView.js'
import _ from 'lodash'
const {
  initTableConfig,
  createHeadItem,
  convertConfigPanel,
  addCloseButton,
  configRouteConvert,
} = useView()

const initPaymentZayavka = (paymentConfigOrig, zayavkaConfigOrig) => {
  const paymentConfig = initTableConfig({
    path: 'edit',
    name: 'Начисления и выплаты',
    config: _.cloneDeep(paymentConfigOrig),
    isShow: {
      value: true,
      condition: [
        {
          permissions: [16, 19, 7],
          type: false,
        },
      ],
    },
  })
  const zayavkaConfig = initTableConfig({
    path: 'edit',
    name: 'Расход',
    config: _.cloneDeep(zayavkaConfigOrig),
    isShow: {
      value: true,
      condition: [
        {
          permissions: [7],
          type: false,
        },
      ],
    },
  })

  paymentConfig.config.options = {
    ...paymentConfig.config.options,
    urlDetail: 'personal_id',
    alias: 'pb.personal_id',
  }

  zayavkaConfig.config.options = {
    ...zayavkaConfig.config.options,
    urlDetail: 'personal_id',
    alias: 'z.personal_id',
  }

  createHeadItem({
    config: zayavkaConfig.config.head,
    item: {
      title: 'Создано',
      alias: 'z.date_create',
      value: 'date_create',
    },
  })

  const LIST_HEAD_PAYMENTS = [
    'status_name',
    'account_name',
    'date_add',
    'bank_fio',
    'total',
  ]
  const LIST_HEAD_ZAYAVKA = [
    'status_name',
    'category_name',
    'schet',
    'date_create',
    'total',
    'price',
  ]
  const LIST_PANEL = ['Обновить']

  convertConfigPanel({
    config: paymentConfig.config,
    listHead: LIST_HEAD_PAYMENTS,
    listPanel: LIST_PANEL,
  })
  convertConfigPanel({
    config: zayavkaConfig.config,
    listHead: LIST_HEAD_ZAYAVKA,
    listPanel: LIST_PANEL,
  })

  addCloseButton(paymentConfig.config)
  addCloseButton(zayavkaConfig.config)

  return { paymentConfig, zayavkaConfig }
}

export { initPaymentZayavka }
