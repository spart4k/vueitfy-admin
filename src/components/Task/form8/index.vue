<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <span>Создайте расход на документы:</span>
      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn color="info"> Открыть </v-btn>
          </div>
        </v-col>
      </v-row>
      <!-- {{ getNameDoc(1) }} -->
      <div class="position-relative">
        <div
          class="mb-10"
          :class="{
            'overflow-inputs':
              !data.data.zayavka.status == 5 && typeof newString !== 'object',
          }"
        >
          <span>Приложите документы</span>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, index) in listDocuments"
              :key="index"
            >
              <v-expansion-panel-header>
                <span>
                  <v-icon left v-if="!item.inProcess"> $IconGalka </v-icon>
                  <v-icon left v-if="item.inProcess"> $IconSetting </v-icon>
                  {{ data.data.docs_spr[item.doc_id] }}
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Dropzone
                  :options="{
                    withoutSave: false,
                    folder: 'tmp',
                    removeble: false,
                  }"
                  :paramsForEmit="{ item: item.doc_id }"
                  @addFiles="addFiles"
                ></Dropzone>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>

      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn
              color="success"
              :disabled="listDisbledDocuments != 0"
              @click="sendDocuments"
            >
              Приложить
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div>
        <span>Патент</span>
      </div>
      <v-row>
        <v-col
          cols="6"
          :class="[
            listDisbledDocuments > 0 && data.data.need_patent
              ? 'overflow-inputs'
              : '',
          ]"
        >
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
              removeble: false,
            }"
            :paramsForEmit="{ item: 5 }"
            @addFiles="addFilesPatent"
          ></Dropzone>
        </v-col>
        <v-col
          cols="6"
          :class="[
            listDisbledDocuments > 0 && data.data.need_patent
              ? 'overflow-inputs'
              : '',
          ]"
        >
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
              removeble: false,
            }"
            :paramsForEmit="{ item: 15 }"
            @addFiles="addFilesPatent"
          ></Dropzone>
        </v-col>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn
          color="info"
          class="mr-3"
          :disabled="disableFinishState !== 2"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
        <v-btn @click="$emit('closePopup')" color="blue-grey">
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
    z-index: 10;
  }
}
</style>
