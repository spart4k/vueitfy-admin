<template>
  <div class="type">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="type-expension-head">
          <div class="type-head">
            <div class="type-head-info">
              <span>Начислено ранее</span>
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
            <template v-if="objects && !objects.length">
              <div class="empty">Отсутствует</div>
            </template>
            <template v-else>
              <Row
                v-for="item in objects"
                :key="item"
                :period="period"
                :personalId="personalId"
                :object="object"
                :row="item"
              />
            </template>
          </div>

          <!-- <v-expansion-panels > -->

          <!-- <v-expansion-panel>
              <v-expansion-panel-header class="type-expension-head">
                <v-row class="justify-space-between">
                  <span>{{ item.vid_vedomost_name }}</span>
                  <span>{{ item.sum }}</span>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="subItem in 16" :key="subItem" class="type-head">
                  <v-col cols="12" sm="3">1 янв</v-col>
                  <v-col cols="12" sm="3">500 000р</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
          <!-- </v-expansion-panels> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
