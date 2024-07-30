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
            <div
              v-for="(item, index) in object"
              :key="index"
              :class="index && 'mt-3'"
            >
              <v-row>
                <div class="text--text mr-3">{{ index + 1 }}.</div>
                <v-row class="d-block">
                  <v-row>
                    <v-icon class="mr-3" color="textGray">
                      mdi-account-outline
                    </v-icon>
                    <span class="text--text font-weight-bold">{{
                      list.account[item.account_id]
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="5" class="pl-0 pr-0">
                      <v-icon class="mr-3" color="textGray">
                        mdi-calendar-clock-outline
                      </v-icon>
                      <span class="text--text">{{
                        convertData(item.date_request)
                      }}</span></v-col
                    >
                    <v-col cols="12" sm="3">
                      <span class="text--text">
                        {{ list.doljnost[item.doljnost_id] }}
                      </span>
                    </v-col>
                    <v-col cols="12" sm="4" class="pl-0 pr-0">
                      <v-row class="justify-end">
                        <v-icon class="mr-3" color="textGray">
                          mdi-clock-outline
                        </v-icon>
                        <span class="text--text">{{ item.hour }}.00</span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row v-if="item.note">
                    <span class="text--text">Примечание: {{ item.note }}</span>
                  </v-row>
                </v-row>
              </v-row>
              <v-divider class="mt-3"></v-divider>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
