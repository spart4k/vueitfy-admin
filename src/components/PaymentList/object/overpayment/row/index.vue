<template>
  <div class="type">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="type-expension-head">
          <div class="type-head">
            <div class="type-head-info">
              <span :class="isOpen && 'font-weight-medium'">{{
                row.vid_vedomost_name
              }}</span>
              <v-chip
                class="type-head-info__total mr-2"
                color="green"
                variant="flat"
              >
                {{ row.remainder }}р
              </v-chip>
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
          <template v-if="!loading && objects && objects.length">
            <v-row v-for="row in objects" class="justify-space-between">
              <span>{{ convertData(row.date_target) }}</span>
              <span class="text-right">{{ row.object_name }}</span>
              <span class="text-right">{{ row.sum }}р</span>
              <span class="text-right">{{ row.remainder }}р</span>
              <!-- <span>{{ item.sum }}</span> -->
              <!-- asdads -->
            </v-row>
          </template>
          <template v-else>
            <div class="empty">Отсутствует</div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
