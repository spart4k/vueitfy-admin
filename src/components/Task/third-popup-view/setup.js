import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
const ThirdPopupView = defineComponent({
  name: 'ThirdPopupView',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
  },
  props: {
    objectData: {
      type: Object,
    },
    data: {
      type: Object,
    },
  },
  //   {
  //     "code": 1,
  //     "error": "",
  //     "task": {
  //         "date_create": "2023-09-29 10:21:58",
  //         "date_status": "2023-09-29 10:21:58",
  //         "del": 0,
  //         "dop_data": "{}",
  //         "entity": 6,
  //         "entity_id": 3,
  //         "from_account_id": 1145,
  //         "from_fio": "Сергей Семенов",
  //         "id": 23,
  //         "next_step": "{\"2\":[{\"num\":3,\"if\":true}],\"6\":[{\"num\":2,\"if\":true}]}",
  //         "note": null,
  //         "parent_action": 24,
  //         "process": 4,
  //         "process_id": 24,
  //         "status": 1,
  //         "task_type_id": 10,
  //         "time_execution": "0",
  //         "to_account_id": 1030,
  //         "to_fio": "Зарипова Луиза",
  //         "type_parent_action": 1
  //     },
  //     "entity": {
  //         "accepted_amount": null,
  //         "bank_name": "",
  //         "city_id": 277,
  //         "close_schet": "[{\"id\":1,\"name\":\"close_1695972093649.png\",\"valid\":0},{\"id\":2,\"name\":\"close_1695972111376.png\",\"valid\":0}]",
  //         "count": 7,
  //         "data_subvision": "{\"leader\": 1173, \"object\": 108547, \"person\": 75694}",
  //         "date_create": "2023-09-29 10:16:39",
  //         "date_status": "2023-09-29 11:16:00",
  //         "del": 0,
  //         "direction_id": 1,
  //         "error_text": "",
  //         "from_account_id": 1129,
  //         "id": 3,
  //         "is_debit": 0,
  //         "is_repaid_debit": 2,
  //         "items": "[{\"rashod_vid_id\":\"51\",\"count\":\"1\",\"price\":\"1000\",\"name\":\"null\"},{\"rashod_vid_id\":\"52\",\"count\":\"1\",\"price\":\"220\",\"name\":\"null\"},{\"rashod_vid_id\":\"55\",\"count\":\"1\",\"price\":\"10\",\"name\":\"null\"},{\"rashod_vid_id\":\"54\",\"count\":\"1\",\"price\":\"100\",\"name\":\"null\"},{\"rashod_vid_id\":\"43\",\"count\":\"1\",\"price\":\"100\",\"name\":\"null\"},{\"rashod_vid_id\":\"50\",\"count\":\"1\",\"price\":\"100\",\"name\":\"null\"},{\"rashod_vid_id\":\"44\",\"count\":\"1\",\"price\":\"100\",\"name\":\"null\"}]",
  //         "note": "",
  //         "payment_id": null,
  //         "payment_rek_id": null,
  //         "payment_schet": "",
  //         "payment_type": 2,
  //         "personal_id": 75694,
  //         "price": "1630.00",
  //         "rashod_category_id": 8,
  //         "realtor_id": null,
  //         "region_id": 57,
  //         "rek1": "Гиневский Олег Валерьевич",
  //         "rek2": "40817810740015934083",
  //         "rek_id": 152,
  //         "responsible": 1129,
  //         "schet_status_id": null,
  //         "status": 5,
  //         "status_account_id": 1129,
  //         "target_id": null,
  //         "token": null,
  //         "total_debit": 0,
  //         "type_zayavka": 1,
  //         "unfinished": 1
  //     },
  //     "data": []
  // }
  setup({ data }) {
    const infoObj = {
      pasp: {
        key: 'key',
        value: 'value',
      },
    }
    const context = {
      root: {
        store,
      },
    }

    console.log(data)
    // let file = ref()
    let imagePreview = ref()
    // let sendFile
    const handleFileUpload = async (e) => {
      let file = e.target.files[0]
      console.log(file)
      let reader = new FileReader()
      reader.addEventListener(
        'load',
        async function () {
          imagePreview.value = reader.result
          console.log(imagePreview.value)
          const dataFrom = await makeRequest()
          const newVal = await newRequest()
          console.log(dataFrom, newVal)
        }.bind(this),
        false
      )

      reader.readAsDataURL(file)
      let form_data = new FormData()
      // file/save/personal_doc/personal_doc_1231412342134.jpg

      // Объект для отправки данных в самом конце формы

      // accaunt_id по дефолту полставить 25
      // $.ajax('/set/data/personal_doc', {
      //  method: "POST",
      //    data: {id: $doc['id'], path_doc: '/personal_doc/имя файла'
      //    success: function() {
      //     }
      //   })
      form_data.append('file', file)
      let fileExt = file.type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      const { makeRequest } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
      })
      const { makeRequest: newRequest } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            id: 1,
            path_doc: `/personal_doc/${fileName}`,
          }),
      })
    }

    const isShowBtn = ref(true)

    const addToDenied = () => {
      isShowBtn.value = false
    }
    // let file = evt.target.files; // FileList object
    // let f = file[0];
    // // Only process image files.
    // if (!f.type.match('image.*')) {
    //     alert("Image only please....");
    // }
    // var reader = new FileReader();
    // // Closure to capture the file information.
    // reader.onload = (function(theFile) {
    //     return function(e) {
    //         // Render thumbnail.
    //         var span = document.createElement('span');
    //         span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
    //         document.getElementById('output').insertBefore(span, null);
    //     };
    // })(f);
    // // Read in the image file as a data URL.
    // reader.readAsDataURL(f);

    // $.ajax('/task/change_status_task', {
    //  method: "POST",
    //  data: {status: 2, data: {
    //   process_id: $task['process_id'],
    //   account_id: ACCOUNT_ID,
    //    task_id: $task['id'],
    //    parent_action: $task['id'],
    //   personal_id: $entity['id'],
    //    docs_id: $dop_data['docs_id'],
    //   comment: $('#comment_out').val(),
    //    bank_card_id: если в доп дата есть $dop_data['bank_card_id']
    //   }},
    //   success: function (data) {
    //  }
    //   })

    const confirmDocs = ref([])
    const editedDocs = ref({})
    return {
      infoObj,
      confirmDocs,
      editedDocs,
      handleFileUpload,
      imagePreview,
      addToDenied,
      isShowBtn,
    }
  },
})
export default ThirdPopupView
