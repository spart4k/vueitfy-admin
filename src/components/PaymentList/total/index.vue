<template>
  <div class="total mt-3">
    <v-row>
      <v-col cols="12" sm="5">
        <p class="weight">Подытог:</p>
      </v-col>
      <v-col cols="12" sm="7">
        <v-row
          v-for="(field, fieldKey) in fields"
          class="justify-space-between"
        >
          <p :class="fieldKey === 'total_by_services' ? 'weight' : 'default'">
            {{ field }}
          </p>
          <p
            :class="
              ['total_coefficient', 'total_by_services'].includes(fieldKey)
                ? 'green--text'
                : fieldKey !== 'total'
                ? 'red--text'
                : ''
            "
            v-if="!loading"
          >
            {{ info[fieldKey] }}
          </p>
          <template v-else>
            <div v-for="loading in 1" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-end mt-4 topay">
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
