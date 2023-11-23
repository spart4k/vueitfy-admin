<template>
  <div style="padding-top: 10px">
    <div style="text-align: center">
      <span style="font-weight: 700; font-size: 20px; text-align: center"
        >{{ data.entity.name }}
        {{ data.entity.data_rojd.split('-').reverse().join('.') }}</span
      >
      <!-- <span>(28.08.1998 г.р.)</span> -->
    </div>
    <div class="mb-2">
      <div style="font-size: 18px" class="font-weight-bold">
        Встретьте линейщика:
      </div>
      <div class="d-flex align-center">
        <span class="mr-1">Билет:</span>
        <a :href="data.data.ticket" target="_blank">
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

    <span style="font-size: 18px" class="font-weight-bold"
      >Приложите миграционную карту:</span
    >
    <Dropzone :options="options" @addFiles="addFiles"></Dropzone>

    <v-row class="py-2" justify="end">
      <v-btn color="info" class="mr-2" @click="sendData" :disabled="!isShowBtn">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
