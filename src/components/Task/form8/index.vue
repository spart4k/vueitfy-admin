<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <span class="font-weight-bold">Создайте расход на документы:</span>
      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn small color="info" @click="pushToZayavka">
              {{ data.data?.zayavka?.id ? 'Изменить' : 'Создать' }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div class="position-relative">
        <div class="mb-10">
          <span class="font-weight-bold d-block mb-3"
            >Приложите документы:</span
          >
          <v-expansion-panels>
            <!-- :disabled="+data.data?.zayavka?.status !== 5" -->
            <v-expansion-panel
              v-for="(accordion, index) in listDocuments"
              :key="index"
              :disabled="!expensesActive"
            >
              <v-expansion-panel-header>
                <span>
                  <v-icon left v-if="!accordion.inProcess"> $IconGalka </v-icon>
                  <v-icon left v-if="accordion.inProcess">
                    $IconSetting
                  </v-icon>
                  {{ data.data.docs_spr[accordion.doc_id] }}
                </span>
                <div>
                  <span class="text-left">{{ accordion.title }}</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Dropzone
                  :options="{
                    withoutSave: false,
                    folder: 'tmp',
                    removeble: false,
                  }"
                  :paramsForEmit="{ item: accordion.doc_id }"
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
              small
              color="success"
              :disabled="listDisbledDocuments < 1 || !expensesActive"
              @click="sendDocuments"
            >
              Приложить
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div>
        <span class="font-weight-bold d-block mb-3">Патент:</span>
      </div>
      <v-row :class="patentsActive ? 'patents-active' : 'patents-disabled'">
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
            :disabled="true"
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
          class="mr-3"
          small
          @click="$emit('closePopup')"
          color="blue-grey"
        >
          <v-icon small>mdi-close</v-icon>
          Закрыть
        </v-btn>
        <v-btn
          small
          color="info"
          :disabled="disableFinishState !== 2"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
      <component
        :is="Popup"
        :options="{
          width: proxyConfig.detail.width,
          portal: `table-detail${
            proxyConfig?.detail?.popupIndex
              ? proxyConfig?.detail?.popupIndex
              : ''
          }`,
        }"
        v-if="
          proxyConfig.detail &&
          proxyConfig.detail.type === 'popup' &&
          popupForm.isShow
        "
      >
        <router-view
          :detail="proxyConfig.detail"
          :class="[
            ...proxyConfig.detail.bootstrapClass,
            ...proxyConfig.detail.classes,
          ]"
          @closePopup="closePopupForm"
          @refreshData="$emit('refreshData')"
        />
      </component>
    </div>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
