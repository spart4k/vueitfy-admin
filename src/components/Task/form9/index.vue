<template>
  <div>
    <div style="padding: 8px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <v-row>
        <v-col cols="12">
          <!-- <div style="display: flex; justify-content: center">
            <v-btn small color="info"> Открыть </v-btn>
          </div> -->
        </v-col>
      </v-row>
      <div class="mb-10">
        <span>Приложите документы</span>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(item, index) in listDocuments"
            :key="index"
            ref="docs"
          >
            <v-expansion-panel-header>
              <div>
                <span>
                  <v-icon left v-if="!item.inProcess"> $IconGalka </v-icon>
                  <v-icon left v-if="item.inProcess"> $IconSetting </v-icon>
                  {{ data.data.docs_spr[item.doc_id] }}
                </span>
                <div v-if="item.path_doc" style="margin-top: 10px">
                  Скан:
                  <a
                    download
                    :href="'https://test.api.personal-crm.ru' + item.path_doc"
                    target="_blank"
                    ><v-icon left width="10px"> $IconDocument </v-icon></a
                  >
                </div>
              </div>
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
                :ref="`docDropzone` + index"
              ></Dropzone>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn
              small
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
        <span>Приложите закрывающие документы</span>
      </div>
      <v-row>
        <Dropzone
          :options="{
            withoutSave: false,
            folder: 'tmp',
            removeble: false,
            countFiles: 20,
          }"
          :paramsForEmit="{}"
          @addFiles="addFilesPatent"
          ref="clearDropzone"
        ></Dropzone>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn
              small
              color="success"
              :disabled="!isSetFilesCloseSchet"
              @click="sendCloseDocsSchet"
            >
              Приложить
            </v-btn>
            <!-- <v-btn
              small
              color="success"
              :disabled="listDisbledDocuments != 0"
              @click="sendDocuments"
            >
              Приложить
            </v-btn> -->
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn
          small
          color="info"
          class="mr-3"
          :disabled="listDisbledDocuments !== 0 && !listNewChet.length"
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
