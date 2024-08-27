<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Начисление &nbsp;<a href="#" class="text-h6">№{{ data.entity.id }}</a
        >&nbsp; на дату {{ convertDate(data.entity.date_target) }}
      </v-card-title>
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
      <v-textarea
        rows="2"
        clearable
        @input="commentErr = ''"
        label="Комментарий"
        v-model="formData.comment"
        :error-messages="commentErr"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        :loading="loading"
        class="mr-2"
        small
        @click="endTask({ type: 1 })"
        color="info"
      >
        <v-icon small>mdi-content-save</v-icon>
        Согласовать
      </v-btn>
      <v-btn
        :loading="loading"
        class="mr-2"
        small
        @click="endTask({ type: 2 })"
        color="error"
      >
        <v-icon small>mdi-close</v-icon>
        Не согласовать
      </v-btn>
      <v-btn
        v-if="directionToMagnit"
        class="mr-2"
        small
        :loading="loading"
        @click="endTask({ type: 3 })"
        color="warning"
      >
        <v-icon small>mdi-close</v-icon>
        НЛУ
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
    <v-dialog persistent v-model="confirm" width="580">
      <v-card>
        <v-card-title
          class="text-h5 text-center"
          style="word-break: auto-phrase"
        >
          Начисление будет отклонено из-за несоответствия путевого листа,
          подтвердите!
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="endTaskConfirm({ type: 3 })">
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
