<template>
  <div>
    <div style="padding: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd }} г.р)
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
      <v-row>
        <div class="mb-10">
          <span style="font-size: 20px">Приложите документы</span>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, index) in listDocuments"
              :key="index"
            >
              <v-expansion-panel-header>
                <v-row align="center">
                  <span>
                    <v-icon left v-if="!item.inProcess"> $IconGalka </v-icon>
                    <v-icon left v-if="item.inProcess"> $IconSetting </v-icon>
                    {{ data.data.docs_spr[item.doc_id] }}
                  </span>
                </v-row>
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

        <v-divider></v-divider>
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
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
            }"
          ></Dropzone>
        </v-col>
        <v-col cols="6">
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
            }"
          ></Dropzone>
        </v-col>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn color="info" class="mr-3">
          <v-icon left> $IconMain </v-icon>
          Завершить
        </v-btn>
        <v-btn @click="$emit('closePopup')" color="blue-grey">
          <v-icon left> $IconMain </v-icon>
          Закрыть
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
