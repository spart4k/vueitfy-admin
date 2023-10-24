<template>
  <div style="padding: 20px">
    <div>
      <span>Паспорт:</span>
      <a
        download
        :href="
          'https://test.api.personal-crm.ru' + data.data.doc_ident.path_doc
        "
        ><v-icon left> $IconDocument </v-icon></a
      >
    </div>
    <span style="font-size: 20px"> Заполните данные заявки: </span>
    <v-row>
      <v-col cols="6">
        <v-select
          label="Наименование"
          :items="[...data.data.rashod_vid_id, {}]"
          item-text="name"
          v-model="selectName"
        >
          <!-- <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.name"></v-list-item>
          </template>  -->
        </v-select></v-col
      >
      <v-col cols="3"> <v-text-field disabled value="1"></v-text-field></v-col>
      <v-col cols="3"> <v-text-field v-model="price"></v-text-field></v-col>
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
    <v-row class="py-2" justify="end">
      <v-btn color="info" class="mr-3">
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
