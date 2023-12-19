<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ name }}</span
        >&nbsp;({{ dataRojd }} г.р)
      </v-card-title>
      <FormError v-if="dopData && dopData.comment" class="mb-5">
        {{ dopData.comment }}
      </FormError>
      <v-row>
        <v-col>
          <div class="mb-3" style="font-weight: 600">
            Внесите данные личного ключа:
          </div>
        </v-col>
      </v-row>
      <v-form>
        <v-row>
          <v-col>
            <span>Скан:</span>
            <a download :href="process.env.API_STORE + doc.path_doc"
              ><v-icon left small> $IconDocument </v-icon></a
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.key"
              v-model="keyForm.key"
              label="Ключ"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.name"
              v-model="keyForm.name"
              label="ФИО"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="keyForm.trainee"
              label="Стажерская"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        :disabled="!keyFormValidate()"
        @click="completeTask"
        class="mr-2"
        color="info"
        small
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
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
