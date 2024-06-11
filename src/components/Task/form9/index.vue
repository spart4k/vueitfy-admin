<template>
  <div>
    <div style="padding: 8px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd: data.entity.data_rojd.split('-').reverse().join('.'),
        }"
      />
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <v-row>
        <v-col cols="12">
          <!-- <div style="display: flex; justify-content: center">
            <v-btn small color="info"> Открыть </v-btn>
          </div> -->
        </v-col>
      </v-row>
      <div class="mb-7">
        <DocForm
          v-if="listDocuments && listDocuments.length"
          @changeDocs="changeDocs"
          :docsData="listDocuments"
          :listNames="data.data.docs_spr"
          :docs="listDocuments"
          :entity="data.entity"
          :task="data.task"
          ref="docFormRef"
          title="Приложите документы:"
          :showFields="false"
          :showDropzone="true"
          :withoutSave="true"
          :fromTask="true"
        ></DocForm>
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
      <div class="">
        <span>Закрывающие документы:</span>
        <DocAccepting
          :docName="item.name"
          v-for="(item, index) in data.data.zayavka.close_schet"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
          :hideActions="true"
        ></DocAccepting>
      </div>
      <div class="mt-8">
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
          :loading="loading"
          :disabled="!docsAttached || !data.data.zayavka.close_schet.length"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
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
