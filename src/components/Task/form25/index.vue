<template>
  <div>
    <div style="padding: 10px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd,
        }"
      />
      <div style="margin-bottom: 30px" v-if="!showNextStep">
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
        <DocAccepting
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></DocAccepting>
        <v-textarea
          v-model="comment"
          @input="commentError = ''"
          :error-messages="commentError"
          rows="2"
          clearable
          label="Комментарий"
          class="mb-2"
        ></v-textarea>
        <v-btn
          small
          @click="clickCheckBtn"
          color="primary"
          block
          :disabled="!isActiveBtnFirst"
          class="mb-1"
        >
          Завершить
        </v-btn>
        <v-btn small @click="$emit('closePopup')" color="blue-grey" block>
          Закрыть
        </v-btn>
      </div>
      <div v-if="showNextStep">
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
        <v-expansion-panels class="mb-5" v-if="isHasOsnDoc" accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row align="center">
                <v-icon color="green" class="mr-2" v-if="osnValidate()" small
                  >$IconGalka</v-icon
                >
                <span>Основные данные</span>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.name"
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
                        v-model="formData.data_rojd"
                        label="Дата рождения"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="z-index"
                      v-model="formData.data_rojd"
                      min="1940-01-01"
                      color="primary"
                      locale="ru-RU"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col style="position: relative; z-index: 30">
                  <v-select
                    v-model="formData.grajdanstvo_id"
                    persistent-hint
                    :items="citizenItems"
                    label="Гражданство"
                  ></v-select>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <DocForm
          v-if="docs && docs.length"
          @changeDocs="changeDocs"
          :docsData="docsData"
          :listNames="listNames"
          :docs="docs"
          :entity="entity"
        ></DocForm>
      </div>
    </div>

    <v-divider></v-divider>
    <v-row class="py-2" justify="end" v-if="showNextStep">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn small :disabled="!isFormValid" color="info" @click="sendData">
        <v-icon small>mdi-content-save</v-icon>
        Сохранить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
