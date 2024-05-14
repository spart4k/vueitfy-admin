<template>
  <div style="padding-top: 10px">
    <PersTitle
      :data="{
        surname: data.entity.surname,
        name_n: data.entity.name_n,
        patronymic: data.entity.patronymic,
        dataRojd: data.entity.data_rojd.split('-').reverse().join('.'),
      }"
    />
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
      <v-icon
        class="mr-1"
        v-if="selectName !== '' && date_in !== ''"
        x-small
        color="green"
        >$IconGalka</v-icon
      >
      Заселите:
    </div>
    <v-row>
      <v-col :cols="12" :sm="5">
        <Autocomplete
          :readonly="autocompleteConfig.readonly"
          :field="autocompleteConfig"
          :filter="autocompleteConfig.filter"
          v-model="selectName"
        />
      </v-col>
      <v-col :cols="12" :sm="4">
        <DateTimePicker
          :label="'Дата заселения'"
          :field="{}"
          v-model="date_in"
        />
      </v-col>
      <v-col :cols="12" :sm="3">
        <v-checkbox
          v-model="is_registration"
          :label="'Регистрация'"
        ></v-checkbox>
      </v-col>
    </v-row>
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
        :disabled="(!selectName && selectName !== 0) || !hasMigr || !date_in"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
