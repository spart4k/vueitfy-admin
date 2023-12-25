<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center">
        Назначение <a href="#">&nbsp;№{{ entity.id }}&nbsp;</a> на дату
        {{ dateTarget }}
      </v-card-title>
      <TextInfo :infoObj="infoObj" />
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn @click="confirm" class="mr-2" small color="info">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn @click="reject" class="mr-2" small color="error">
        <v-icon small>mdi-close</v-icon>
        Отклонить
      </v-btn>
      <v-btn @click="$emit('closePopup')" small color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
