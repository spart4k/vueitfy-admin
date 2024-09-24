<template>
  <v-expansion-panels v-model="expansion" flat accordion multiple>
    <v-expansion-panel class="pactPanel" v-for="zone in proxyValue">
      <v-expansion-panel-header style="min-height: 56px" class="px-3 py-0">
        <v-row class="d-flex align-center justify-space-between">
          <span>
            <span class="text--text">{{ zone.name }} </span>
          </span>
          <!-- <v-btn
            class="px-3 mr-3 text-none"
            @click.stop
            elevation="0"
            color="primary"
            text
            ><v-icon class="mr-2" size="24" color="primary"
              >mdi-file-document-outline</v-icon
            >Добавить версию</v-btn
          > -->
        </v-row>
        <template v-slot:actions>
          <v-progress-circular
            v-if="zone.loaded === false"
            color="primary"
            :size="22"
            indeterminate
          />
        </template>
      </v-expansion-panel-header>
      <!-- <v-expansion-panel-content class="px-3">
        <v-divider class="mb-3"></v-divider>
      </v-expansion-panel-content> -->
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
