<template>
  <v-card class="height-100 py-3 px-3" color="background" elevation="0">
    <template v-if="!loading">
      <v-expansion-panels flat accordion multiple v-model="types">
        <!-- {{ data.types }} -->
        <v-expansion-panel
          v-for="type in 1"
          :key="type.id"
          class="contractPanel mb-3 mt-0 py-0 px-3"
        >
          <v-expansion-panel-header style="min-height: 48px" class="py-0 px-0">
            {{ type.name ?? 'zxc' }}
            <template v-slot:actions>
              <v-progress-circular
                v-if="type.loaded === false"
                color="primary"
                :size="22"
                indeterminate
              />
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="">
            <v-row class="btn-container mb-3">
              <!-- {{ type.territories }} -->
              <v-btn
                v-for="(territory, index) in 6"
                :key="territory.id"
                min-height="48px"
                elevation="0"
                :color="!index ? 'primary' : 'text'"
                :class="['btn', !index && 'btn--active', 'text-capitalize']"
                :outlined="index"
              >
                {{ territory.name ?? 'территория' }}
              </v-btn>
            </v-row>
            <v-row>
              <v-card elevation="0" class="px-1 py-1">
                <v-btn
                  v-for="(item, index) in switchBtn"
                  :key="index"
                  min-height="35px"
                  elevation="0"
                  :color="!index ? 'primary' : 'text'"
                  :class="[!index && 'btn--active', 'text-capitalize']"
                  :text="index"
                >
                  {{ item.name }}
                </v-btn>
              </v-card>
            </v-row>
            <v-list-item-title class="text--text font-weight-700 my-3"
              >ЮГ</v-list-item-title
            >

            <!-- Договор -->
            <Pact />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template v-else>
      <div class="d-flex height-100 align-center justify-center">
        <v-progress-circular :size="80" color="primary" indeterminate />
      </div>
    </template>
  </v-card>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
