<template>
  <div>
    <div style="padding: 20px">
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
        <span>Приложите выработку</span>

        <Dropzone
          :options="{
            withoutSave: false,
            folder: 'tmp',
          }"
        ></Dropzone>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn :disabled="true" class="mr-2" small color="info">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn @click="$emit('closePopup')" small color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
