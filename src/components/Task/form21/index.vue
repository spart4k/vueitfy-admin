<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ name }}</span
        >&nbsp;({{ dataRojd }} г.р)
      </v-card-title>
      <FormError v-if="data.data.dop_data" class="mb-5">
        {{ data.data.dop_data }}
      </FormError>
      <v-row>
        <v-col>
          <div class="mb-3">
            <v-icon class="mr-2" v-if="isKeyConfrmed" x-small color="green"
              >$IconGalka</v-icon
            >
            <v-icon
              class="mr-2"
              v-else-if="!isKeyConfrmed && !isBtnDisabled"
              x-small
              color="red"
              >$IconClose</v-icon
            >
            <span>Проверьте данные личного ключа:</span>
          </div>
        </v-col>
      </v-row>
      <v-form>
        <v-row>
          <v-col>
            <span>Скан:</span>
            <a download :href="$root.env.VUE_APP_STORE + doc.photo_path"
              ><v-icon left small> $IconDocument </v-icon></a
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              readonly
              v-model="keyForm.key"
              label="Ключ"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              readonly
              v-model="keyForm.name"
              label="ФИО"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              readonly
              v-model="keyForm.trainee"
              label="Стажерская"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="py-2 px-2" justify="end">
          <v-btn @click="rejectKey" class="mr-2" color="error" small>
            <v-icon left small> $IconClose </v-icon>
            Отклонить
          </v-btn>
          <v-btn @click="confirmKey" color="primary" small>
            <v-icon left small> $IconMain </v-icon>
            Принять
          </v-btn>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>
      <v-row class="px-2">
        <v-textarea
          rows="2"
          clearable
          @input="formCommentError = ''"
          label="Комментарий"
          v-model="formComment"
          :error-messages="formCommentError"
        ></v-textarea
      ></v-row>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" color="blue-grey" small>
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn @click="completeTask" :disabled="isBtnDisabled" color="info" small>
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
