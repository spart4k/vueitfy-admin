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
          <a download href="#">
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
      <v-btn @click="confirm" class="mr-2" color="info">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn @click="reject" class="mr-2" color="error">
        <v-icon small>mdi-close</v-icon>
        Отклонить
      </v-btn>
      <v-btn @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
