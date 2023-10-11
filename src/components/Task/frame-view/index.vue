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
    </div>
    <v-divider></v-divider>
    <div class="task-slot">
      <FirstPopupView
        v-if="data.task.task_type_id === 1"
        :data="data"
        ref="FirstPopupView"
      ></FirstPopupView>
      <FifthPopupView
        v-if="data.task.task_type_id === 2"
        :data="data"
      ></FifthPopupView>
      <!--      <ThirdPopupView />-->
      <!--      <FourthPopupView />-->
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
