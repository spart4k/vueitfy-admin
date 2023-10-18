<template>
  <div class="task">
    <div class="task__loader" v-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-row class="task__title">
      <v-card-title class="title py-5">
        {{ taskName }}
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
      <v-row v-if="taskDeadline" class="task__info-row" align="center">
        <v-icon class="mr-5" small>$IconMain</v-icon>
        <span class="timer">{{ timerString }}</span>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="task-slot">
      <!--Внесение-->
      <Form1 v-if="data.task.task_type_id === 1" :data="data"></Form1>
      <!--Подтверждение-->
      <Form2 v-if="data.task.task_type_id === 2" :data="data"></Form2>
      <!--Исправление-->
      <Form7 v-if="data.task.task_type_id === 7" :data="data"></Form7>
      <!--Подтверждение назначения-->
      <Form15 v-if="data.task.task_type_id === 15" :data="data" />
      <!--Внесение ключа-->
      <Form20 v-if="data.task.task_type_id === 20" :data="data" />
      <!--Подтверждение ключа-->
      <Form21 v-if="data.task.task_type_id === 21" :data="data" />
      <!--Согласование начисления-->
      <Form27 v-if="data.task.task_type_id === 27" :data="data" />
      <!--Корректировка начисления-->
      <Form28 v-if="data.task.task_type_id === 28" :data="data" />
      <!--Корректировка документов-->
      <Form8 v-if="data.task.task_type_id === 8" :data="data"></Form8>
      <!-- <Form23 v-if="data.task.task_type_id === 23" :data="data"></Form23> -->
      <ThirdPopupView v-if="data.task.task_type_id === 23" :data="data" />
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
