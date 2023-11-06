<template>
  <div>
    <div style="padding: 20px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Назначение &nbsp;<a href="#" class="text-h6">№{{ entity.id }}</a
        >&nbsp; на дату 07.02.2023
      </v-card-title>
      <div v-if="fileOutput">
        <span>Скан:</span>
        <a target="_blank" :href="fileOutput"
          ><v-icon left small> $IconDocument </v-icon></a
        >
      </div>
      <TextInfo class="mb-3" :infoObj="textInfo" />
      <div>
        <v-row v-for="(group, i) in formGroup" :key="i">
          <v-col class="p-0" cols="6">
            <v-select outlined label="Наименование"></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field type="number" outlined label="QTY"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              label="Тариф"
              disabled
              readonly
            ></v-text-field>
          </v-col>
          <v-col class="p-0" cols="2">
            <v-text-field
              outlined
              label="Сумма"
              disabled
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="idDirection === 6">
          <v-col style="padding: 0" cols="6">
            <v-btn
              @click="removeGroup"
              class="form-btn form-btn--remove"
              color="error"
              block
              >-</v-btn
            >
          </v-col>
          <v-col style="padding: 0" cols="6">
            <v-btn
              @click="addGroup"
              class="form-btn form-btn--add"
              color="primary"
              block
              >+</v-btn
            >
          </v-col>
        </v-row>
        <v-textarea
          v-model="formComment"
          @input="formCommentError = ''"
          :error-messages="formCommentError"
          rows="2"
          clearable
          label="Комментарий"
        ></v-textarea>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="pb-0 pt-3" justify="end">
      <v-btn @click="confirmTask" class="mr-2" small color="info">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn @click="rejectTask" class="mr-2" small color="error">
        <v-icon left> $IconClose </v-icon>
        Отклонить
      </v-btn>
      <v-btn @click="$emit('closePopup')" small color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
