<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <div class="position-relative">
        <div class="mb-10">
          <span class="font-weight-bold">Приложите документы: </span>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, index) in listDocuments"
              :key="index"
            >
              <v-expansion-panel-header>
                <span>
                  <v-icon left v-if="!item.inProcess" small>
                    $IconGalka
                  </v-icon>
                  <v-icon left v-if="item.inProcess" small> $IconClose </v-icon>
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
                <v-row class="py-2" justify="end">
                  <v-btn
                    color="error"
                    class="mr-3"
                    small
                    @click="addDisabledDocuments({ item: item.doc_id })"
                  >
                    <v-icon small>mdi-close</v-icon>
                    Отклонить
                  </v-btn>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <span class="font-weight-bold">Уточните работает ли сотрудник: </span>
      <v-row class="pb-2 pt-1 px-0" justify="center">
        <v-col class="ps-0" cols="2" align-self="center"
          ><v-btn color="error" class="" small @click="emplyeeFired">
            <v-icon small>mdi-content-save</v-icon>
            Уволен
          </v-btn></v-col
        >
      </v-row>
      <v-row>
        <v-textarea
          v-model="comment"
          placeholder="Комментарий"
          class="pt-0"
          rows="2"
        ></v-textarea>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn
          color="info"
          class="mr-3"
          @click="sendTaskFinish"
          small
          :disabled="!refds || (!disabledDocumentsAcc && !comment)"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
        <v-btn @click="$emit('closePopup')" color="blue-grey" small>
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
