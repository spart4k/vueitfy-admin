<template>
  <div class="type">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="type-expension-head">
          <div class="personal-head">
            <div class="type-head-info">
              <span>К удержанию</span>
            </div>
            <div class="type-head-panel"></div>
          </div>
          <template v-slot:actions>
            <v-progress-circular
              v-if="loading"
              color="primary"
              :size="20"
              indeterminate
            />
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="content-wrap">
            <!-- <template v-if="objects && !objects.length">
              <div class="empty">Отсутствует</div>
            </template>
            <template v-else>
              
            </template> -->
            <InfoOverpayment
              :period="period"
              :personalId="personalId"
              :object="object"
            />
            <InfoConsumption
              :period="period"
              :personalId="personalId"
              :object="object"
            />
          </div>
          <!-- <v-expansion-panels v-for="item in objects" :key="item">
            <v-expansion-panel>
              <v-expansion-panel-header class="type-expension-head">
                <v-row class="type-head">
                  <v-col cols="12" sm="5">Таскание мешков</v-col>
                  <v-col cols="12" sm="2">999</v-col>
                  <v-col cols="12" sm="2">999</v-col>
                  <v-col cols="12" sm="3">100 000 000р</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="subItem in 4" :key="subItem" class="type-head">
                  <v-col cols="12" sm="5">01.01.2001</v-col>
                  <v-col cols="12" sm="2">1</v-col>
                  <v-col cols="12" sm="2">1.4</v-col>
                  <v-col cols="12" sm="3">5р</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
