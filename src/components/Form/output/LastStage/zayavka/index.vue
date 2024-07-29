<template>
  <v-list class="overflow-auto mt-2 mb-2" max-height="400">
    <v-row class="mt-0">
      <v-expansion-panels
        v-for="(object, objectIndex) in stage.targets"
        :key="objectIndex"
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-if="loadingPersonal">
              <v-col>
                <v-progress-circular
                  :size="20"
                  :width="2"
                  color="primary"
                  indeterminate
                />
              </v-col>
            </template>
            <template v-else>
              {{ list.object[objectIndex] }}
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="(item, index) in object" :key="index">
              <v-divider class="mt-7 mb-8" v-if="index"></v-divider>
              <v-row>
                <v-col cols="12" sm="5">
                  <v-list-item-title class="textDefault--text">
                    {{ list.account[item.account_id] }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="textGray--text">
                    {{ list.doljnost[item.doljnost_id] }}
                  </v-list-item-subtitle>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
