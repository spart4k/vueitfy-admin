<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <span class="font-weight-bold"
        ><v-icon v-if="isWorking !== null" small>$IconGalka</v-icon>Выберите
        статус работника</span
      >
      <v-row justify="center" class="mt-2">
        <v-btn
          @click="
            isWorking = false
            obj = null
          "
          class="mr-2"
          small
          :color="
            isWorking === false || isWorking === null ? 'error' : 'disabled'
          "
        >
          <v-icon small class="mr-2">mdi-close</v-icon>
          Уволен
        </v-btn>
        <v-btn
          @click="isWorking = true"
          small
          :color="
            isWorking === true || isWorking === null ? 'success' : 'disabled'
          "
        >
          <v-icon small class="mr-2">$IconGalka</v-icon>
          Работает
        </v-btn>
      </v-row>
      <v-select
        :disabled="isWorking === false || isWorking === null"
        label="Выберите объект"
        :items="data.data.account_objects"
        item-text="name"
        item-value="id"
        v-model="obj"
      ></v-select>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        small
        @click="confirm"
        :disabled="isWorking === null || (isWorking && !obj)"
        color="info"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
