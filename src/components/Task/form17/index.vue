<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Назначение &nbsp;<a href="#" class="text-h6">№{{ entity.id }}</a
        >&nbsp; на дату 07.02.2023
      </v-card-title>
      <div
        v-if="
          data.entity.doljnost_id == 5 ||
          data.entity.doljnost_id == 7 ||
          data.entity.doljnost_id == 32
        "
      >
        <!-- ($entity['doljnost_id'] == 5 || $entity['doljnost_id'] == 7 || $entity['doljnost_id'] == 32) -->
        <b class="fw-bold">Приложите выработку:</b>

        <Dropzone
          :options="{
            withoutSave: false,
            folder: 'tmp',
            removeble: false,
          }"
          @addFiles="addFiles"
        ></Dropzone>
      </div>
      <div v-if="data.entity.doljnost_id == 6 || data.entity.doljnost_id == 49">
        <div style="display: flex; gap: 5px">
          <div style="width: 500px">
            <span>Наименование:</span>
            <v-select
              :label="data.entity.doljnost_name"
              v-model="selectName"
              disabled
            >
            </v-select>
          </div>
          <div>
            <span>QTY:</span><v-text-field v-model="qty"></v-text-field>
          </div>
          <div>
            <span>Тариф</span
            ><v-text-field disabled label="Не определен"></v-text-field>
          </div>
          <div>
            <span>Сумма:</span
            ><v-text-field v-model="sum" disabled></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        v-if="
          data.entity.doljnost_id == 5 ||
          data.entity.doljnost_id == 7 ||
          data.entity.doljnost_id == 32
        "
        :disabled="!isSetTask"
        class="mr-2"
        small
        color="info"
        @click="completeTask"
      >
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn
        v-if="data.entity.doljnost_id == 6 || data.entity.doljnost_id == 49"
        :disabled="!changeQTY"
        class="mr-2"
        color="info"
        @click="completeTask"
        small
      >
        <v-icon left small> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn @click="$emit('closePopup')" color="blue-grey" small>
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
