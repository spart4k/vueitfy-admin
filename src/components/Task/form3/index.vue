<template>
  <div style="padding: 20px">
    <v-row>
      <v-col cols="6">
        <v-select
          label="Select"
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
        ></v-select
      ></v-col>
      <v-col cols="3"> <v-text-field disabled></v-text-field></v-col>
      <v-col cols="3"> <v-text-field></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div
          style="
            padding: 5px;
            background-color: gray;
            color: white;
            font-weight: 600;
            margin-bottom: 20px;
          "
        >
          Какие-то данные
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span> Приложите билет(ы): </span>
        <Dropzone :options="options"></Dropzone>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
        ><span style="font-weight: 600">Контактная информация</span></v-col
      >

      <v-col cols="12"><span>Заказчик:</span> <span>Тест</span></v-col
      ><v-col cols="12"><span>Моб. -Не указан- Стац. -Не указан-</span></v-col>
    </v-row>
    <v-row class="py-2" justify="end">
      <v-btn color="info">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
