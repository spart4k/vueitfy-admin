<template>
  <div style="padding: 10px">
    <v-row>
      <v-col class="d-flex align-center mb-1">
        <span style="font-size: 18px">Паспорт:</span>
        <a
          download
          :href="
            'https://test.api.personal-crm.ru' + data.data.doc_ident.path_doc
          "
          ><v-icon left> $IconDocument </v-icon></a
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col style="font-size: 18px" class="mb-2">
        Заполните данные заявки:
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          label="Наименование"
          :items="data.data.rashod_vid_id"
          item-text="name"
          item-value="id"
          v-model="selectName"
        >
          <!-- <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.name"></v-list-item>
          </template>  -->
        </v-select></v-col
      >
      <v-col cols="3">
        <v-text-field disabled value="1" label="Кол-во"></v-text-field
      ></v-col>
      <v-col cols="3">
        <v-text-field v-model="price" label="Цена"></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div
          style="
            padding: 5px;
            background-color: rgb(128, 128, 128);
            color: white;
            font-weight: 600;
            margin-bottom: 20px;
          "
        >
          {{ nameComp }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span> Приложите билет(ы): </span>
        <Dropzone :options="options" @addFiles="addFiles"></Dropzone>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"
        ><span style="font-weight: 600">Контактная информация</span></v-col
      >

      <v-col cols="12"
        ><span>Заказчик:</span> <span>{{ data.data.account.name }}</span></v-col
      ><v-col cols="12"
        ><span>Моб. {{ mobilePhone }} Стац. {{ landPhone }}</span></v-col
      >
    </v-row>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn color="info" class="mr-3" @click="sendData">
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
