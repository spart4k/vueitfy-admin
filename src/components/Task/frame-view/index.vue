<template>
  <div class="task">
    <v-row class="task__title">
      <v-card-title class="title py-5">Подтверждение назначения</v-card-title>
    </v-row>
    <v-divider></v-divider>
    <div class="task__info py-3 px-2">
      <v-row class="task__info-row mb-2">
        <v-icon small>$IconPeople</v-icon>
        <span>Сафонов Евгений</span>
        <v-icon small>$IconArrowRight</v-icon>
        <span>Сафонов Евгений</span>
      </v-row>
      <v-row class="task__info-row mb-2">
        <v-icon small>$IconMain</v-icon>
        <span>12 Июля, 07:12</span>
      </v-row>
      <v-row class="task__info-row">
        <v-icon small>$IconMain</v-icon>
        <span>В работе</span>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="task-slot">
      <FirstPopupView></FirstPopupView>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn color="info">
        <v-icon left> $IconMain </v-icon>
        Сохранить
      </v-btn>
      <v-btn color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
