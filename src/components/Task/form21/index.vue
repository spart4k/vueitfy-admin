<template>
  <div>
    <div style="padding: 20px">
      <v-card-title class="py-1 justify-center">
        Назначение <a href="#">&nbsp;№234234&nbsp;</a> на дату 07.02.2023
      </v-card-title>
      <FormError v-if="data.data.dop_data" class="mb-5">
        {{ data.data.dop_data }}
      </FormError>
      <div class="mb-3">Внесите данные личного ключа:</div>
      <v-form>
        <v-row>
          <span>Скан:</span>
          <a target="_blank" :href="'#'">scan</a>
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
          <v-btn @click="rejectKey" class="mr-2" color="error">
            <v-icon left> $IconClose </v-icon>
            Отклонить
          </v-btn>
          <v-btn @click="confirmKey" color="primary">
            <v-icon left> $IconMain </v-icon>
            Принять
          </v-btn>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>
      <FormComment v-model="keyForm.comment"></FormComment>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn :disabled="isBtnDisabled" class="mr-2" small color="info">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn small color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
