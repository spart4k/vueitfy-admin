<template>
  <v-expansion-panels flat accordion multiple>
    <v-expansion-panel class="additionalPanel" v-for="pact in 3">
      <v-expansion-panel-header style="min-height: 56px" class="px-3 py-0">
        <v-row class="d-flex align-center justify-space-between">
          <span>
            <span class="primary--text mr-3">v {{ pact }}.0</span>
            <span class="text--text">Договор №{{ pact }} </span>
            <v-icon class="ml-3 mr-2" color="textGray" size="22"
              >mdi-calendar-clock-outline</v-icon
            >
            <span class="textGray--text">12.09.2024 - 12.10.2024</span>
          </span>
          <span>
            <v-btn class="mx-1" @click.stop elevation="0" color="primary" text
              ><v-icon class="mr-2" size="24" color="primary"
                >mdi-file-document-outline</v-icon
              >Загрузить тарифы</v-btn
            >
            <v-btn
              class="mr-3 px-0"
              @click.stop
              elevation="0"
              min-width="40px"
              color="primary"
              text
              ><v-icon size="20" color="primary"
                >mdi-file-download-outline</v-icon
              ></v-btn
            >
          </span>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-3">
        <v-divider class="mb-3"></v-divider>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
