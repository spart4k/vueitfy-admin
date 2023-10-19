<template>
  <div class="">
    <v-row style="600px">
      <v-col>
        <Popup
          closeButton
          :options="{ width: '600px', portal: 'table-detail' }"
          v-if="true"
        >
          <div style="padding: 20px">
            <v-row>
              <v-col cols="12">
                <div style="display: flex; justify-content: center">
                  <v-btn color="info"> Открыть </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="mb-10">
                  <span style="font-size: 20px">Приложите документы</span>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row align="center">
                          <span>Паспорт</span>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Dropzone :options="options"></Dropzone>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row align="center">
                          <span>СНИЛС</span>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Dropzone :options="options"></Dropzone>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row align="center">
                          <span>Паспорт стр. 2</span>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Dropzone :options="options"></Dropzone>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row align="center">
                          <span>ИНН</span>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Dropzone :options="options"></Dropzone>
                      </v-expansion-panel-content> </v-expansion-panel
                  ></v-expansion-panels>
                </div>

                <v-divider></v-divider>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div style="display: flex; justify-content: center">
                  <v-btn color="success"> Приложить </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <Dropzone :options="options"></Dropzone>
              </v-col>
              <v-col cols="6">
                <Dropzone :options="options"></Dropzone>
              </v-col>
            </v-row>
            <v-row class="py-2" justify="end">
              <v-btn color="info">
                <v-icon left> $IconMain </v-icon>
                Завершить
              </v-btn>
              <v-btn color="blue-grey">
                <v-icon left> $IconMain </v-icon>
                Закрыть
              </v-btn>
            </v-row>
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
    let options = {
      withoutSave: true,
      folder: 'tmp',
    }
    return {
      options,
    }
  },
}
</script>
