<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Начисление &nbsp;<a href="#" class="text-h6">№{{ data.entity.id }}</a
        >&nbsp; на дату {{ convertDate(data.entity.date_target) }}
      </v-card-title>
      <FormError v-if="JSON.parse(data.task.dop_data).comment" class="mb-5">
        {{ JSON.parse(data.task.dop_data).comment || '' }}
      </FormError>
      <TextInfo :infoObj="infoObj" />
      <div v-if="directionToMagnit">
        <span style="font-weight: 600">Путевой лист:</span>
        <div v-if="pathAct">
          <a download :href="$root.env.VUE_APP_STORE + pathAct">
            <img
              style="width: 100%"
              :src="$root.env.VUE_APP_STORE + pathAct"
              alt="#"
            />
          </a>
        </div>
        <span v-else> Не приложен</span>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        :loading="loading"
        class="mr-2"
        small
        @click="endTask"
        color="success"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn
        v-if="JSON.parse(data.task.dop_data)?.valid_lu === 0"
        class="mr-2"
        small
        @click="confirm = true"
        color="warning"
        :loading="loading"
      >
        <v-icon small>mdi-account</v-icon>
        ЦУП
      </v-btn>
      <v-btn
        :loading="loading"
        small
        @click="$emit('closePopup')"
        color="blue-grey"
      >
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
    <v-dialog persistent v-model="confirm" width="400">
      <v-card>
        <v-card-title
          class="text-h5 text-center"
          style="word-break: auto-phrase"
        >
          Отправить путевой лист на согласование ЦУП?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="endTaskConfirm(true)">
            Подтвердить
          </v-btn>
          <v-btn color="error" @click="confirm = false"> Отменить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
