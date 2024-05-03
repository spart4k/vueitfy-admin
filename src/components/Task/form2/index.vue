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
              <template v-if="isHasOsnDoc">
                <v-icon x-small color="green" v-if="isOsnDocConfirmed === true"
                  >$IconGalka</v-icon
                >
                <v-icon
                  x-small
                  color="red"
                  v-else-if="isOsnDocConfirmed === false"
                  >$IconClose</v-icon
                >
              </template>
              <span class="ml-2">Основные данные</span>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.name"
                  readonly
                  label="ФИО"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.data_rojd"
                  label="Дата рождения"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col style="position: relative; z-index: 30">
                <v-select
                  v-model="formData.grajdanstvo_id"
                  persistent-hint
                  :items="citizenItems"
                  label="Гражданство"
                  readonly
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="py-2 px-2" justify="end">
              <v-btn
                name="main_info_reject_btn"
                small
                @click="rejectOsnData"
                class="mr-2"
                color="error"
              >
                <v-icon left> $IconClose </v-icon>
                Отклонить
              </v-btn>
              <v-btn
                name="main_info_accept_btn"
                small
                @click="confirmOsnData"
                color="primary"
              >
                <v-icon left> $IconMain </v-icon>
                Подтвердить
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <DocFormWithConfirm
        v-if="docs && docs.length"
        class="mb-10"
        @change="changeDocs"
        :docsData="docsData"
        :bankData="bankData"
        :listNames="listNames"
        :docs="docs"
      ></DocFormWithConfirm> -->
      <DocForm
        v-if="docs && docs.length"
        class="mb-10"
        @changeDocs="changeDocs"
        :docsData="docsData"
        :bankData="bankData"
        :listNames="listNames"
        :docs="docs"
        :entity="entity"
        :task="JSON.parse(data.task.dop_data)"
        :confirm="true"
        ref="docFormRef"
      ></DocForm>
      <v-textarea
        v-model="comment"
        @input="commentErr = []"
        :error-messages="commentErr"
        rows="2"
        name="comment"
        clearable
        label="Комментарий"
        class="mb-2"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2 px-2" justify="end">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn small :disabled="!isValid" color="info" @click="sendData">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
