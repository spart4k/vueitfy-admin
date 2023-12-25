<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <!-- {{ getNameDoc(1) }} -->
      <div class="mb-10">
        <span>Приложите документы</span>
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>
                <v-icon left v-if="!listDocuments[0].inProcess">
                  $IconGalka
                </v-icon>
                <v-icon left v-if="listDocuments[0].inProcess">
                  $IconSetting
                </v-icon>
                Регистрация
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Dropzone
                :options="{
                  withoutSave: false,
                  folder: 'tmp',
                  removeble: false,
                }"
                :paramsForEmit="{ item: 4 }"
                @addFiles="addFiles"
              ></Dropzone>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>
                <v-icon left v-if="!listDocuments[1].inProcess">
                  $IconGalka
                </v-icon>
                <v-icon left v-if="listDocuments[1].inProcess">
                  $IconSetting
                </v-icon>
                Регистрация стр.2
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Dropzone
                :options="{
                  withoutSave: false,
                  folder: 'tmp',
                  removeble: false,
                }"
                :paramsForEmit="{ item: 14 }"
                @addFiles="addFiles"
              ></Dropzone>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>
                <v-icon left v-if="!listDocuments[2].inProcess">
                  $IconGalka
                </v-icon>
                <v-icon left v-if="listDocuments[2].inProcess">
                  $IconSetting
                </v-icon>
                ИНН
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Dropzone
                :options="{
                  withoutSave: false,
                  folder: 'tmp',
                  removeble: false,
                }"
                :paramsForEmit="{ item: 17 }"
                @addFiles="addFiles"
              ></Dropzone>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>
                <v-icon left v-if="!listDocuments[3].inProcess">
                  $IconGalka
                </v-icon>
                <v-icon left v-if="listDocuments[3].inProcess">
                  $IconSetting
                </v-icon>
                Ученический договор
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Dropzone
                :options="{
                  withoutSave: false,
                  folder: 'tmp',
                  removeble: false,
                }"
                :paramsForEmit="{ item: 25 }"
                @addFiles="addFiles"
              ></Dropzone>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <v-row class="py-2" justify="end">
        <v-btn
          small
          color="info"
          class="mr-2"
          :disabled="listDisbledDocuments !== 0"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
        <v-btn small @click="$emit('closePopup')" color="blue-grey">
          <v-icon small>mdi-close</v-icon>
          Закрыть
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped>
.overflow-inputs {
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.1);
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
