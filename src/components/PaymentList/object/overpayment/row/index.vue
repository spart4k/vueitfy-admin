<template>
  <div class="type">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="type-expension-head">
          <div class="type-head">
            <div class="type-head-info">
              <span>{{ row.vid_vedomost_name }}</span>
            </div>
            <div class="type-head-panel"></div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="row in objects" class="justify-space-between">
            <span>{{ convertData(row.date_target) }}</span>
            <span>{{ row.sum }}р</span>
            <!-- <span>{{ item.sum }}</span> -->
            <!-- asdads -->
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
