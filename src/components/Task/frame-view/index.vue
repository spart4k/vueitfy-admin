<template>
  <div v-if="data">
    <div
      v-if="data.code === 1"
      class="task"
      style="overflow-y: auto; max-height: 80vh; padding-right: 15px"
    >
      <div class="task__loader" v-if="loading">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <v-row class="task__title">
        <v-card-title class="title py-5 text-h4">
          {{ taskName }}
        </v-card-title>
      </v-row>
      <v-divider></v-divider>
      <div class="task__info py-3 px-2">
        <v-row class="task__info-row mb-2">
          <v-icon small>$IconPeople</v-icon>
          <span>{{ data.task.from_fio }}</span>
          <v-icon>mdi-arrow-right</v-icon>
          <span>{{ data.task.to_fio }}</span>
        </v-row>
        <v-row class="task__info-row mb-2">
          <v-icon>mdi-calendar</v-icon>
          <span>{{ formatDate(data.task.date_create) }}</span>
        </v-row>
        <v-row class="task__info-row" align="center">
          <v-icon>mdi-tag</v-icon>
          <span :class="`circle circle--${data.task.status}`"></span>
          <span>{{ data.task.status_name }}</span>
        </v-row>
        <v-row v-if="taskDeadline" class="task__info-row" align="center">
          <v-icon>mdi-timer</v-icon>
          <span class="timer" :class="{ 'timer-minus': timerDiff < 0 }">{{
            timerString
          }}</span>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div class="task-slot">
        <!--Внесение-->
        <Form1
          v-if="data.task.task_type_id === 1"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form1>
        <!--Подтверждение-->
        <Form2
          v-if="data.task.task_type_id === 2"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form2>
        <!--Расходы-->
        <Form3
          v-if="data.task.task_type_id === 3"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form3>
        <Form4
          v-if="data.task.task_type_id === 4"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form4>
        <!--Исправление-->
        <Form5
          v-if="data.task.task_type_id === 5"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form5>
        <Form6
          v-if="data.task.task_type_id === 6"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form6>
        <Form7
          v-if="data.task.task_type_id === 7"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form7>
        <Form8
          v-if="data.task.task_type_id === 8"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form8>
        <Form9
          v-if="data.task.task_type_id === 9"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form9>
        <!--Подтверждение назначения-->
        <Form15
          v-if="data.task.task_type_id === 15"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
        <!--Прикладывание/корректировка выработки-->
        <Form17
          v-if="data.task.task_type_id === 17"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form17>
        <!--Проверка выработки-->
        <Form18
          v-if="data.task.task_type_id === 18"
          :data="data"
          @closePopup="$emit('closePopup')"
        ></Form18>
        <!--Внесение ключа-->
        <Form20
          v-if="data.task.task_type_id === 20"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
        <!--Подтверждение ключа-->
        <Form21
          v-if="data.task.task_type_id === 21"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
        <!--Согласование начисления-->
        <Form27
          v-if="data.task.task_type_id === 27"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
        <!--Корректировка начисления-->
        <Form28
          v-if="data.task.task_type_id === 28"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
        <!--Корректировка документов-->
        <!-- <Form8 v-if="data.task.task_type_id === 8" :data="data" @closePopup"$emit('closePopup')></Form8> -->
        <!-- <Form23 v-if="data.task.task_type_id === 23" :data="data" @closePopup"$emit('closePopup')></Form23> -->
        <ThirdPopupView
          v-if="data.task.task_type_id === 23"
          :data="data"
          @closePopup="$emit('closePopup')"
        />
      </div>
    </div>
    <div v-if="data.code === 2" class="task-error">
      <div>Задача создана с ошибкой.</div>
      <div>Она будет обработана в ближайшее время!</div>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
