<template>
  <div class="">
    <v-row style="600px">
      <v-col>
        <Popup
          closeButton
          :options="{ width: '600px', portal: 'table-detail' }"
          v-if="true"
        >
          <div class="task">
            <v-row>
              <v-col cols="6">
                <v-select
                  label="Select"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                ></v-select
              ></v-col>
              <v-col cols="3"> <v-text-field disabled></v-text-field></v-col>
              <v-col cols="3"> <v-text-field></v-text-field></v-col>
            </v-row>
            <v-divider></v-divider>
            <div
              style="
                padding: 15px;
                background-color: gray;
                color: white;
                font-size: 24px;
                font-weight: 600;
              "
            >
              Какие-то данные
            </div>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <span> Приложите билет(ы): </span>
                <Dropzone :options="field.options"></Dropzone>
              </v-col>
            </v-row>
            <span style="font-size: 24px; font-weight: 600"
              >Контактная информация</span
            >
          </div>
        </Popup>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { required } from '@/utils/validation.js'
// import { stringField, textareaField } from '@/utils/fields.js'
import Popup from '@/components/popup'
import Dropzone from '@/components/dropzone/default'
export default {
  name: 'Grisha',
  components: {
    Popup,
    Dropzone,
  },
  setup() {
    return {}
  },
}
</script>
