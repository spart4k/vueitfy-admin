<template>
  <div style="padding: 20px">
    <v-row>
      <v-col cols="12">
        <div>
          <span style="font-weight: 700; font-size: 20px"
            >{{ data.entity.name }} {{ data.entity.data_rojd }}</span
          >
          <!-- <span>(28.08.1998 г.р.)</span> -->
        </div>
        <span style="">Заселите:</span>
        <v-select
          label="Выберите проживание"
          :items="[
            ...data.data.habitations,
            { id: 0, name: '-Самостоятельное-' },
          ]"
          item-text="name"
          item-value="id"
          v-model="selectName"
        ></v-select
      ></v-col>
    </v-row>

    <v-row>
      <v-col>
        <span style="">Приложите миграционную карту:</span>
        <Dropzone :options="options" @addFiles="addFiles"></Dropzone>
      </v-col>
    </v-row>
    <v-row class="py-2" justify="end">
      <v-btn color="info" class="mr-3" @click="sendData" :disabled="!isShowBtn">
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
