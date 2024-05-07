<template>
  <div>
    <div style="padding-top: 20px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd: data.entity.data_rojd.split('-').reverse().join('.'),
        }"
      />
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
        <div
          :class="[!data.data.zayavka.id ? 'overflow-inputs' : '']"
          class="mb-10"
        >
          <!-- <span class="font-weight-bold">Приложите документы:</span> -->
          <DocForm
            v-if="listDocuments && listDocuments.length"
            @changeDocs="changeDocs"
            :docsData="listDocuments"
            :listNames="listNames"
            :docs="listDocuments"
            :entity="data.entity"
            :task="data.task"
            ref="docFormRef"
            title="Приложите документы:"
            :showFields="false"
            :showDropzone="true"
            :withoutSave="true"
          ></DocForm>
          <!-- <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, index) in listDocuments"
              :key="index"
              :class="`panel_${data.data.docs_spr[item.doc_id]}`"
            >
              <v-expansion-panel-header
                :class="`button_${data.data.docs_spr[item.doc_id]}`"
              >
                <span>
                  <v-icon left v-if="item.inProcess"> $IconSetting </v-icon>
                  <v-icon left v-else> $IconGalka </v-icon>
                  {{ data.data.docs_spr[item.doc_id] }}
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="item.path_doc">
                  <div class="mb-2">
                    <span>Скан:</span>
                    <a download :href="$root.env.VUE_APP_STORE + item.path_doc"
                      ><v-icon left small> $IconDocument </v-icon></a
                    >
                  </div>
                </div>
                <div class="">
                  <Dropzone
                    :options="{
                      withoutSave: false,
                      folder: 'tmp',
                      removeble: false,
                    }"
                    :paramsForEmit="{ item: item.doc_id }"
                    @addFiles="addFiles($event, item)"
                  ></Dropzone>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> -->
        </div>
      </div>

      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn
              small
              color="success"
              :disabled="!canAttach"
              @click="sendDocuments"
            >
              Приложить
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div>
        <span class="font-weight-bold">Патент:</span>
      </div>
      <v-row
        :class="[
          listDisbledDocuments > 0 && !data.data.zayavka.id
            ? 'overflow-inputs'
            : '',
        ]"
      >
        <v-col cols="6">
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
              removeble: false,
            }"
            :paramsForEmit="{ item: 5 }"
            name="patent1"
            @addFiles="addFilesPatent"
          ></Dropzone>
        </v-col>
        <v-col cols="6">
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
              removeble: false,
            }"
            name="patent2"
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
          :disabled="disableFinishState !== 2 || !data.data.zayavka.id"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
      <component
        :is="Popup"
        :options="{
          width: config.detail.width,
          portal: 'table-detail',
        }"
        v-if="
          config.detail && config.detail.type === 'popup' && popupForm.isShow
        "
      >
        <router-view
          :detail="config.detail"
          :class="[...config.detail.bootstrapClass, ...config.detail.classes]"
          @closePopup="closePopupForm"
          @refreshData="refreshData"
        />
      </component>
    </div>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
