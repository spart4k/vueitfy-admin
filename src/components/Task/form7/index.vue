<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ entity.name }}</span
        >&nbsp;({{ dataRojd }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <v-expansion-panels class="mb-5" v-if="isHasOsnDoc" accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row align="center">
              <v-icon class="mr-2" v-if="osnConfirmed" small color="green"
                >$IconGalka</v-icon
              >
              <span>Основные данные</span>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj.formData.name"
                  label="ФИО"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj.formData.data_rojd"
                      label="Дата рождения"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj.formData.data_rojd"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col style="position: relative; z-index: 30">
                <v-select
                  v-model="formObj.formData.grajdanstvo_id"
                  persistent-hint
                  :items="citizenItems"
                  label="Гражданство"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="py-2 px-2" justify="end">
              <v-btn
                :disabled="!formObj.validate()"
                @click="osnConfirmed = true"
                color="warning"
              >
                <v-icon left> $IconMain </v-icon>
                Исправлено
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <DocFormCorrect
        class="mb-10"
        @change="changeDocs"
        :docsData="docsData"
        :listNames="listNames"
        :docs="docs"
        :entity="entity"
      ></DocFormCorrect>
      <FormComment />
    </div>
    <v-divider></v-divider>
    <v-row class="py-2 px-2" justify="end">
      <v-btn
        :disabled="!isFormValid"
        class="mr-2"
        color="info"
        @click="sendData"
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
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
