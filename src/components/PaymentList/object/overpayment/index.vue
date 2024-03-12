<template>
  <div class="object">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="personal-expension-head">
          <div class="personal-head">
            <div class="personal-head-info">
              <span>Переплата</span>
            </div>
            <div class="personal-head-panel"></div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels v-for="item in 4" :key="item">
            <v-expansion-panel>
              <v-expansion-panel-header class="personal-expension-head">
                <v-row class="justify-space-between">
                  <span>Аванс</span>
                  <span>1000р</span>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  v-for="subItem in 16"
                  :key="subItem"
                  class="personal-head"
                >
                  <v-col cols="12" sm="3">1 янв</v-col>
                  <v-col cols="12" sm="3">500 000р</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
