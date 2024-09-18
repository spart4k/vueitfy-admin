<template>
  <v-card class="height-100 py-3 px-3" color="background" elevation="0">
    <template v-if="!loading">
      <v-expansion-panels flat accordion multiple v-model="expansion">
        <v-expansion-panel
          v-for="type in types"
          :key="type.id"
          class="contractPanel mb-3 mt-0 py-0 px-3"
        >
          <v-expansion-panel-header style="min-height: 48px" class="py-0 px-0">
            {{ type.name }}
            <template v-slot:actions>
              <v-progress-circular
                v-if="type.data.loaded === false"
                color="primary"
                :size="22"
                indeterminate
              />
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="">
            <v-row class="btn-container mb-3">
              <v-btn
                v-for="(territory, index) in type.data.territories"
                :key="territory.id"
                min-height="48px"
                elevation="0"
                @click.shift="changeTerritory(index, type.data, 'shift')"
                @click.ctrl="changeTerritory(index, type.data, 'ctrl')"
                @click.meta="changeTerritory(index, type.data, 'ctrl')"
                @click.exact="changeTerritory(index, type.data)"
                :color="type.data.active.includes(index) ? 'primary' : 'text'"
                :class="[
                  'btn',
                  type.data.active.includes(index) && 'btn--active',
                  'text-none',
                ]"
                :outlined="!type.data.active.includes(index)"
              >
                {{ territory.name }}
              </v-btn>
            </v-row>
            <v-row>
              <v-card elevation="0" class="px-1 py-1">
                <v-btn
                  v-for="(item, index) in switchBtn"
                  :key="index"
                  min-height="35px"
                  elevation="0"
                  @click="type.data.docType = item.value"
                  :color="type.data.docType === index ? 'primary' : 'text'"
                  :class="[
                    type.data.docType === index && 'btn--active',
                    'text-none',
                  ]"
                  :text="type.data.docType !== index"
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
