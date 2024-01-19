<template>
  <div style="padding-top: 10px">
    <div style="text-align: center">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
    </div>
    <!-- data.migr_card -->
    <div v-if="widthTrasfer" class="mb-2">
      <div style="font-size: 18px" class="font-weight-bold">
        Встретьте линейщика:
      </div>
      <div class="d-flex align-center">
        <span class="mr-1">Билет:</span>
        <a download :href="data.data.ticket">
          <v-icon small>mdi-ticket</v-icon>
        </a>
      </div>
    </div>

    <div
      style="font-size: 18px"
      class="d-flex align-center font-weight-bold mb-2"
    >
      <v-icon class="mr-1" v-if="selectName !== ''" x-small color="green"
        >$IconGalka</v-icon
      >
      Заселите:
    </div>
    <v-select
      label="Выберите проживание"
      :items="[...data.data.habitations, { id: 0, name: '-Самостоятельное-' }]"
      item-text="name"
      item-value="id"
      v-model="selectName"
    ></v-select>
    <span style="font-size: 18px" class="font-weight-bold">
      <v-icon x-small color="green" v-if="isGalkaVisible || hasMigr"
        >$IconGalka</v-icon
      >
      Приложите миграционную карту:
    </span>
    <Dropzone :options="options" @addFiles="addFiles"></Dropzone>

    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        small
        color="info"
        @click="sendData"
        :disabled="(!selectName && selectName !== 0) || !hasMigr"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
