<template>
  <div style="padding-top: 10px">
    <v-row>
      <v-col class="d-flex align-center">
        <span class="font-weight-medium" style="font-size: 18px">Паспорт:</span>
        <a
          download
          :href="
            'http://10.63.1.132:3000/file/get' + data.data.doc_ident.path_doc
          "
          ><v-icon left> $IconDocument </v-icon></a
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col style="font-size: 18px" class="mb-2">
        <v-icon v-if="selectName && price" small color="green"
          >$IconGalka</v-icon
        >
        <span class="font-weight-medium">Заполните данные заявки:</span>
      </v-col>
    </v-row>
    <v-row class="mt-0">
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
    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <v-text-field
          :value="nameComp"
          disabled
          hide-details
          class="pt-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>
          <v-icon v-if="file" small color="green">$IconGalka</v-icon>
          <span class="font-weight-medium" style="font-size: 18px"
            >Приложите билет(ы):</span
          >
        </span>
        <Dropzone :options="options" @addFiles="addFiles"></Dropzone>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12"
        ><span class="font-weight-medium" style="font-size: 18px"
          >Контактная информация:</span
        ></v-col
      >

      <v-col cols="12"
        ><span class="font-weight-bold">Заказчик: </span>
        <span>{{ data.data.account.name }}</span></v-col
      ><v-col cols="12 mb-4"
        ><span
          ><span class="">Моб.</span> {{ mobilePhone }}
          <span class="font-weight-bold">Стац.</span> {{ landPhone }}</span
        ></v-col
      >
    </v-row>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-3" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        small
        :disabled="!selectName || !price || !file"
        color="info"
        @click="sendData"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped>
.col::v-deep {
  padding-left: 8px;
}
</style>
