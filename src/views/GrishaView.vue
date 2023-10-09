<template>
  <div class="">
    <v-row style="600px">
      <v-col>
        <Popup
          closeButton
          :options="{ width: '600px', portal: 'table-detail' }"
          v-if="true"
        >
          <Task />
        </Popup>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { ref } from 'vue'
import { required } from '@/utils/validation.js'
import { stringField, textareaField } from '@/utils/fields.js'
import Popup from '@/components/popup'
import Task from '@/components/Task/frame-view/index.vue'

export default {
  name: 'Grisha',
  components: {
    Popup,
    Task,
  },
  setup() {
    const testFields = ref({
      id: 0,
      name: 'Основные',
      type: 'FormDefault',
      lists: ['vid_vedomost_id', 'status_id', 'direction_id'],
      alias: 'payment',
      active: false,
      fields: [
        stringField({
          label: 'Часы:',
          name: 'Часы',
          placeholder: '',
          class: [''],
          position: {
            cols: 12,
            sm: 6,
          },
          validations: { required },
          bootstrapClass: [''],
        }),
        textareaField({
          label: 'Текст ошибки',
          name: 'error_text',
          placeholder: '',
          class: [''],
          position: {
            cols: 12,
            sm: 6,
          },
          validations: { required },
          bootstrapClass: [''],
        }),
      ],
    })
    console.log()
    // make with data
    return {
      testFields,
    }
  },
}
</script>
