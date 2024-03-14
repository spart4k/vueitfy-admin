<template>
  <div class="type">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="type-expension-head">
          <div class="type-head">
            <div class="type-head-info">
              <v-row class="type-head">
                <v-col cols="12" sm="5">{{ row.category_name }}</v-col>
                <v-col cols="12" sm="2">{{ row.qty }}</v-col>
                <v-col cols="12" sm="2">{{ row.price }}</v-col>
                <v-col class="red--text text-right" cols="12" sm="3">{{
                  row.sum
                }}</v-col>
              </v-row>
              <!-- <span>{{ row.service_name }}</span> -->
            </div>
            <div class="type-head-panel"></div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="loading">
            <div v-for="loading in 4" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
          <template v-else>
            <template v-if="!objects.length">
              <div class="empty">Отсутствует</div>
            </template>
            <template v-else>
              <v-row v-for="row in objects" class="justify-space-between">
                <v-row class="type-head">
                  <v-col cols="12" sm="6">{{ row.rashod_vid_name }}</v-col>
                  <v-col cols="12" sm="3">{{ row.count }}</v-col>
                  <v-col class="red--text text-right pr-8" cols="12" sm="3">{{
                    row.sum
                  }}</v-col>
                </v-row>
                <!-- <span>{{ item.sum }}</span> -->
                <!-- asdads -->
              </v-row>
            </template>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
