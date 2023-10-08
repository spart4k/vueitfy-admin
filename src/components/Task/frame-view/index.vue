<template>
  <div class="task">
    <div class="task__loader" v-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-row class="task__title">
      <v-card-title class="title py-5">
        {{ data.task.task_type_id }}
      </v-card-title>
    </v-row>
    <v-divider></v-divider>
    <div class="task__info py-3 px-2">
      <v-row class="task__info-row mb-2">
        <v-icon small>$IconPeople</v-icon>
        <span>{{ data.task.from_fio }}</span>
        <v-icon small>$IconArrowRight</v-icon>
        <span>{{ data.task.to_fio }}</span>
      </v-row>
      <v-row class="task__info-row mb-2">
        <v-icon small>$IconMain</v-icon>
        <span>{{ formatDate(data.task.date_create) }}</span>
      </v-row>
      <v-row class="task__info-row" align="center">
        <v-icon small>$IconMain</v-icon>
        <span :class="`circle circle--${data.task.status}`"></span>
        <span>{{ data.task.status }}</span>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="task-slot">
      <FirstPopupView
        :data="data"
        ref="FirstPopupView"
        @prepareCaseAndPush="pushData"
      ></FirstPopupView>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn color="info" @click="sendData">
        <v-icon left> $IconMain </v-icon>
        Завершить
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
