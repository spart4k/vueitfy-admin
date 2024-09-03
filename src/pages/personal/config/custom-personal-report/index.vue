<template>
  <v-card class="pt-3 pb-6 px-6">
    <v-row class="d-flex justify-space-between">
      <v-btn
        @click="changeMonth(-1)"
        class="px-0"
        width="110"
        color="textGray"
        text
      >
        <v-icon color="gray">mdi-chevron-left</v-icon> {{ getMonth(-1) }}
      </v-btn>
      <v-menu
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
            >{{ getMonth() }}, {{ getYear(date) }}
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
        </v-date-picker>
      </v-menu>
      <v-btn
        @click="changeMonth(1)"
        class="px-0"
        width="110"
        color="textGray"
        text
        >{{ getMonth(1) }} <v-icon color="gray">mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <div class="py-3 overflow-auto" style="height: 400px">
      <div
        class="d-flex justify-center align-center"
        style="height: 100%"
        v-if="loading.period"
      >
        <v-progress-circular color="primary" :size="80" indeterminate />
      </div>
      <template v-else>
        <template v-if="data.period.length">
          <v-row v-for="item in data.period" :key="item.parser_id">
            <v-col cols="12" sm="4" class="px-0 d-flex"
              ><v-icon
                size="24"
                class="mr-6 cursor-default"
                :color="item.success ? 'success' : 'error'"
                >{{
                  item.success
                    ? 'mdi-checkbox-marked-circle'
                    : 'mdi-close-circle'
                }}</v-icon
              >
              <div>
                <div class="text--text font-weight-500">
                  Автовыгрузка №{{ item.parser_id }}
                </div>
                <div class="text--disabled font-weight-500">
                  {{ item.period }}
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="px-6 d-flex align-center justify-center"
            >
              <span class="text--disabled font-weight-500">
                {{ getParseTime(item.date) }}
              </span>
            </v-col>
            <v-col cols="12" sm="4" class="px-0">
              <div class="d-flex justify-end align-center height-100">
                <v-btn
                  color="primary"
                  elevation="0"
                  class="px-0 mr-1"
                  min-width="40"
                  height="40"
                  @click="download(item.path)"
                >
                  <v-icon size="20" color="cardBackground"
                    >mdi-file-download-outline</v-icon
                  >
                </v-btn>

                <v-menu left offset-x v-if="item.errors_count">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="transparent"
                      elevation="0"
                      class="px-0 mr-1"
                      min-width="40"
                      height="40"
                    >
                      <v-icon size="24" color="textGray"
                        >mdi-dots-vertical</v-icon
                      >
                    </v-btn>
                  </template>
                  <v-list class="py-0 px-0 d-flex flex-column">
                    <v-btn
                      elevation="0"
                      text
                      class="height-100 px-3"
                      height="40"
                      color="text"
                      @click="
                        parser.id = item.parser_id
                        dialog = true
                        getErrors()
                      "
                      ><v-icon class="mr-3" size="24" color="error"
                        >mdi-alert-circle-outline</v-icon
                      >Посмотреть ошибки</v-btn
                    >
                  </v-list>
                </v-menu>
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <div
            style="height: 100%"
            class="d-flex justify-center align-center flex-column"
          >
            <v-icon size="100" class="mb-3 cursor-default" color="textGray"
              >mdi-progress-download</v-icon
            >
            <span class="text--text text-h6 mb-3">Здесь пока пусто</span>
            <span class="text--disabled text-h6"
              >Выгрузки за данный период не обнаружено</span
            >
          </div>
        </template>
      </template>
    </div>
    <v-divider class="mb-3"></v-divider>
    <v-row class="justify-end">
      <v-btn @click="$emit('closePopup')" color="text" text> Закрыть </v-btn>
    </v-row>

    <v-dialog persistent v-model="dialog" width="600">
      <v-card class="py-6 px-6">
        <v-card-title class="py-0 px-0 text--text text-h5 font-weight-bold"
          >Вывод ошибок</v-card-title
        >
        <v-divider class="mt-3"></v-divider>
        <div style="height: 400px" class="text--text py-3 overflow-auto">
          <div
            v-if="loading.errors && parser.page === 1"
            class="d-flex justify-center align-center"
            style="height: 100%"
          >
            <v-progress-circular color="primary" :size="80" indeterminate />
          </div>
          <template v-else>
            <v-row
              v-intersect.once="item.intersecting && getErrors"
              v-for="(item, index) in data.errors"
              :key="index"
            >
              <span>
                <v-icon color="error" class="mr-3"> mdi-alert </v-icon>
                {{ item.name }}
              </span>
            </v-row>
            <div
              v-if="loading.errors && parser.page !== 1"
              class="d-flex justify-center py-1"
            >
              <v-progress-circular color="primary" :size="30" indeterminate />
            </div>
          </template>
          <div v-if="dialog"></div>
        </div>
        <v-divider class="mb-3"></v-divider>
        <v-row class="justify-end">
          <v-btn
            @click="
              dialog = false
              parser.id = 0
              parser.page = 1
            "
            color="text"
            text
          >
            Закрыть
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
