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
            <v-expansion-panels
              multiple
              v-for="(personal, personalIndex) in object"
              :key="personalIndex"
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
                    {{ list.personal[personalIndex] }}
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="(item, index) in personal" :key="index">
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
                      <v-col cols="12" sm="3">
                        <v-list-item-title class="text--text">
                          {{ convertData(item.date_target) }}
                        </v-list-item-title>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-row class="text-end">
                          <v-list-item-title class="textDefault--text">
                            {{ item.total
                            }}<v-icon small dense class="ml-2" color="text">
                              mdi-currency-rub
                            </v-icon>
                          </v-list-item-title>
                        </v-row>
                        <v-divider class="mt-0 mb-0"></v-divider>
                        <v-row class="text-end">
                          <v-list-item-title class="textGray--text">
                            <v-icon small dense class="mr-1" color="textGray">
                              mdi-clock-outline</v-icon
                            >{{ item.hour }} <span class="text-h6">*</span>
                            {{ item.object_price_price }}
                            <v-icon small dense class="mr-1" color="textGray">
                              mdi-currency-rub
                            </v-icon>
                          </v-list-item-title>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- {{ personal }} -->
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
