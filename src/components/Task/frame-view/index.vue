<template>
  <div v-if="data">
    <div v-if="data.code === 1" class="task" style="padding: 15px">
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
        <!-- <v-row
          v-if="data.data?.zayavka?.id"
          class="task__info-row"
          align="center"
        >
          <v-icon>mdi-tag</v-icon>
          <a target="_blank" :href="`/zayavka/${data.data.zayavka.id}`"
            >Заявка №{{ data.data.zayavka.id }}</a
          >
        </v-row> -->
        <v-row class="task__info-row" align="center">
          <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
          <span :class="`circle circle--${data.task.status}`"></span>
          <span>{{ data.task.status_name }}</span>
        </v-row>
        <v-row v-if="false" class="task__info-row" align="center">
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
          @getItems="$emit('getItems')"
        ></Form1>
        <!--Подтверждение-->
        <Form2
          v-if="data.task.task_type_id === 2"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form2>
        <!--Расходы-->
        <Form3
          v-if="data.task.task_type_id === 3"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form3>
        <Form4
          v-if="data.task.task_type_id === 4"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form4>
        <!--Исправление-->
        <Form5
          v-if="data.task.task_type_id === 5"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form5>
        <Form6
          v-if="data.task.task_type_id === 6"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form6>
        <Form7
          v-if="data.task.task_type_id === 7"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form7>
        <Form8
          v-if="data.task.task_type_id === 8"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
          @refreshData="refreshData"
        ></Form8>
        <Form9
          v-if="data.task.task_type_id === 9"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form9>
        <Form10
          v-if="data.task.task_type_id === 10"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form10>
        <Form11
          v-if="data.task.task_type_id === 11"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
          @refreshData="refreshData"
        ></Form11>
        <!--Подтверждение назначения-->
        <Form13
          v-if="data.task.task_type_id === 13"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form14
          v-if="data.task.task_type_id === 14"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form15
          v-if="data.task.task_type_id === 15"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!-- Внесение назначения в PVP-портал -->
        <Form16
          v-if="data.task.task_type_id === 16"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--Прикладывание/корректировка выработки-->
        <Form17
          v-if="data.task.task_type_id === 17"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form17>
        <!--Проверка выработки-->
        <Form18
          v-if="data.task.task_type_id === 18"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        ></Form18>
        <!--Внесение ключа-->
        <Form20
          v-if="data.task.task_type_id === 20"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--Подтверждение ключа-->
        <Form21
          v-if="data.task.task_type_id === 21"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--  -->
        <Form25
          v-if="data.task.task_type_id === 25"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--Согласование начисления-->
        <Form27
          v-if="data.task.task_type_id === 27"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--Корректировка начисления-->
        <Form28
          v-if="data.task.task_type_id === 28"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form29
          v-if="data.task.task_type_id === 29"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form31
          v-if="data.task.task_type_id === 31"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form34
          v-if="data.task.task_type_id === 34"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form35
          v-if="data.task.task_type_id === 35"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form36
          v-if="data.task.task_type_id === 36"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form37
          v-if="data.task.task_type_id === 37"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form38
          v-if="data.task.task_type_id === 38"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
          @refreshData="refreshData"
        />
        <Form39
          v-if="data.task.task_type_id === 39"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <Form40
          v-if="data.task.task_type_id === 40"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
        />
        <!--Корректировка документов-->
        <!-- <Form8 v-if="data.task.task_type_id === 8" :data="data" @closePopup"$emit('closePopup')></Form8> -->
        <!-- <Form23 v-if="data.task.task_type_id === 23" :data="data" @closePopup"$emit('closePopup')></Form23> -->
        <ThirdPopupView
          v-if="data.task.task_type_id === 23"
          :data="data"
          @closePopup="$emit('closePopup')"
          @getItems="$emit('getItems')"
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
