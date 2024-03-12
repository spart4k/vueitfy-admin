<template>
  <div class="total mt-3">
    <v-row>
      <v-col cols="12" sm="4">
        <p>Подытог:</p>
      </v-col>
      <v-col cols="12" sm="8">
        <v-row class="justify-space-between">
          <p>Сумма по выработке</p>
          <p v-if="!loading">{{ info.total_by_services }}</p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
        <v-row class="justify-space-between"
          ><p>Начислено ранее</p>
          <p v-if="!loading">{{ info.total_hold }}</p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
        <v-row class="justify-space-between"
          ><p>Сумма к удержанию</p>
          <p v-if="!loading">{{ info.total_debit }}</p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
        <v-row class="justify-space-between"
          ><p>Коэффициент</p>
          <p v-if="!loading">{{ info.total_coefficient }}</p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
        <v-row class="justify-space-between"
          ><p>Итого</p>
          <p v-if="!loading">{{ info.total }}</p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-end mt-4">
      <p class="d-flex">
        К начислению:
        <span class="ml-2" v-if="!loading">{{ info.total_payment }} р</span>
        <template v-else>
          <div
            v-for="loading in 1"
            :key="loading"
            class="ml-2 form-row-loading"
          >
            <div class="form-row-loading-wrap gradient"></div>
          </div>
        </template>
      </p>
    </v-row>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
