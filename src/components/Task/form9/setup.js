import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/dropzone/default'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
// import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
// import moment from 'moment'

const Form8 = defineComponent({
  name: 'Form8',
  components: {
    Dropzone,
  },
  data() {
    return {
      docs_spr: [
        'Паспорт',
        'СНИЛС',
        'Реквизиты карты',
        'Регистрация',
        'Патент',
        'Паспорт стр.2',
        'Перевод',
        'Мед. книжка',
        'Вид на жительство',
        'Миграционная карта',
        'ДМС',
        'Рабочая виза',
        'Чек-патент первичный',
        'Регистрация стр. 2',
        'Патент стр. 2',
        'Фото',
        'ИНН',
        'Экзамен РФ',
        'Чек-патент текущий',
        'Дактилоскопия',
        'Дактилоскопия стр. 2',
        'Вид на жительство стр. 2',
        'Медосмотр',
        'ID карта',
        'Ученический договор',
      ],
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }) {
    const context = {
      root: {
        store,
      },
    }
    let docs_spr = [
      'Паспорт',
      'СНИЛС',
      'Реквизиты карты',
      'Регистрация',
      'Патент',
      'Паспорт стр.2',
      'Перевод',
      'Мед. книжка',
      'Вид на жительство',
      'Миграционная карта',
      'ДМС',
      'Рабочая виза',
      'Чек-патент первичный',
      'Регистрация стр. 2',
      'Патент стр. 2',
      'Фото',
      'ИНН',
      'Экзамен РФ',
      'Чек-патент текущий',
      'Дактилоскопия',
      'Дактилоскопия стр. 2',
      'Вид на жительство стр. 2',
      'Медосмотр',
      'ID карта',
      'Ученический договор',
    ]
    // let getNameDoc = (docID) => {
    //   return docs_spr[docID]
    // }

    // onMounted(() => {
    //   console.log(docs_spr, getNameDoc)
    // })
    let options = {
      withoutSave: false,
      folder: 'tmp',
    }
    let selectName = ref('')
    let price = ref('')
    let nameComp = JSON.parse(data.entity.items)[0].name

    let landPhone = computed(() =>
      data.data.account.landline_phone
        ? data.data.account.landline_phone
        : 'Не указан'
    )
    let mobilePhone = computed(() =>
      data.data.account.mobile_phone
        ? data.data.account.mobile_phone
        : 'Не указан'
    )
    let file = ref('')
    let addFiles = (e) => {
      file.value = e[0]
      console.log(file.value)
    }

    const sendData = () => {}
    return {
      options,
      selectName,
      price,
      nameComp,
      landPhone,
      mobilePhone,
      addFiles,
      sendData,
    }
  },
})
export default Form8
