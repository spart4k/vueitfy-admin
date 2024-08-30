<template>
  <v-card class="pt-3 pb-6 px-6">
    <v-row class="d-flex justify-space-between">
      <v-btn class="px-0" width="110" color="textGray" text>
        <v-icon color="gray">mdi-chevron-left</v-icon> {{ getMonth(date, -1) }}
      </v-btn>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="px-0 mx-2"
            width="290"
            color="text"
            text
            ><v-icon color="gray" class="mr-3">mdi-calendar-text-outline</v-icon
            >{{ getMonth(date) }}, {{ getYear(date) }}
          </v-btn>
        </template>
        <v-date-picker
          v-model="date"
          color="primary"
          locale="ru-RU"
          :type="'month'"
          :first-day-of-week="1"
          reactive
        >
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn text color="primary" @click="menu = false"> OK </v-btn> -->
        </v-date-picker>
      </v-menu>
      <v-btn class="px-0" width="110" color="textGray" text
        >{{ getMonth(date, 1) }} <v-icon color="gray">mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <!-- <v-card-title class="py-0 px-0 text--text text-h5 font-weight-bold"
      >Вывод ошибок</v-card-title
    > -->
    <!-- <div style="max-height: 70vh" class="text--text py-3 overflow-auto">
      <v-row
        v-for="(item, index) in proxyValue.response.data?.errors"
        :key="index"
      >
        <v-icon color="error" class="mr-3"> mdi-alert </v-icon>
        {{ item }}
      </v-row>
    </div> -->
    <div>
      <br />
      <br />
      <br />
    </div>
    <v-divider class="mb-3"></v-divider>
    <v-row class="justify-end">
      <v-btn color="text" text> Закрыть </v-btn>
    </v-row>
  </v-card>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
