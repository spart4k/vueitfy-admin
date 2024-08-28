<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Начисление &nbsp;<a @click="openPayment(data.entity.id)" class="text-h6"
          >№{{ data.entity.id }}</a
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
      <span class="font-weight-bold mb2"
        ><v-icon small v-if="dropzone.length">$IconGalka</v-icon>Приложите
        документы подтверждающие смену:
      </span>
      <Dropzone
        class="mt-2"
        v-model="dropzone"
        :options="{
          withoutSave: false,
          folder: 'magnit_act_path',
          removeble: true,
          countFiles: 1,
        }"
      ></Dropzone>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        :loading="loading"
        class="mr-2"
        small
        @click="endTask"
        color="primary"
        :disabled="!dropzone.length"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
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
    <Popup
      :options="{
        width: config.detail.width,
        portal: 'table-detail',
      }"
      v-if="config.detail && config.detail.type === 'popup' && popupForm.isShow"
    >
      <router-view
        :detail="config.detail"
        :class="[...config.detail.bootstrapClass, ...config.detail.classes]"
        @closePopup="closePopupForm"
      />
    </Popup>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
