<template>
  <div style="padding: 20px">
    <v-row>
      <v-col cols="12">
        <div>
          <span style="font-weight: 500; font-size: 20px"
            >Каримов Хурамчон Ахмадхонович(28.08.1998 г.р.)</span
          ><span>(28.08.1998 г.р.)</span>
        </div>
        <span style="font-size: 20px">Заселите:</span>
        <v-select
          label="Выберите проживание"
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
    </v-row>

    <v-row>
      <v-col>
        <span style="font-size: 20px">Приложите миграционную карту:</span>
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
