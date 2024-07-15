<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;{{ data.entity.address }}
      </v-card-title>
      <p class="mb-4 d-flex align-center">
        <v-icon class="textDefault--text mr-1 cursorDefault">
          mdi-chart-ppf
        </v-icon>
        <span class="font-weight-bold">Бины:&nbsp;</span> {{ currentQty }} /
        {{ data.data.max_bin }}
      </p>

      <!-- <TextInfo class="mb-3" :infoObj="textInfo" /> -->
      <!-- <FormError class="mb-4" v-if="rejectedPrice">
        Отсутствует тариф: {{ rejectedPrice }}
      </FormError> -->
      <!-- {{ data }} -->
      <v-expansion-panels multiple color="navbar">
        <v-expansion-panel v-for="target in targets" :key="target.id">
          <v-expansion-panel-header
            >Назначение {{ target.id }} {{ target.personal_name }} на
            {{ target.date_target }}</v-expansion-panel-header
          >
          <v-expansion-panel-content eager>
            <Service
              :task="target.task"
              ref="service"
              :serviceDetail="data.data.services"
              :formGroup="target.services"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider></v-divider>
    <v-row class="pb-0 pt-3" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" small color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        :disabled="!isFormValid || currentQty !== data.data.max_bin"
        @click="confirmTask"
        small
        color="info"
        class="mr-2"
        :loading="loading"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
