<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Назначение &nbsp;<a href="#" class="text-h6">№{{ entity.id }}</a
        >&nbsp; на дату 07.02.2023
      </v-card-title>
      <TextInfo :infoObj="infoObj" />
      <div>
        <div style="font-weight: 600">Путевой лист:</div>
        <div v-if="directionToMagnit && pathAct">
          <a download :href="'http://10.63.1.132:3000/file/get' + pathAct">
            <img style="width: 100%" :src="pathAct" alt="#" />
          </a>
        </div>
        <div v-else>Не приложен</div>
      </div>
      <v-textarea
        rows="2"
        clearable
        @input="() => (commentErr = '')"
        label="Комментарий"
        v-model="formData.comment"
        :error-messages="commentErr"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn small @click="confirm" class="mr-2" color="info">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn small @click="reject" color="error">
        <v-icon small>mdi-close</v-icon>
        Отклонить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
