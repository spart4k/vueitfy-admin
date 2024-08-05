<template>
  <v-list class="overflow-auto mt-2 mb-2" max-height="400">
    <v-row class="mt-0" v-for="(item, index) in stage.targets" :key="index">
      <v-expansion-panels>
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
              {{ getPersonalName(index) }}
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template v-if="stage.type === 3">
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="item.damage_sum"
                  label="Бой/порча(р.)"
                  :readonly="true"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="item.errors_sum"
                  label="Ошибки(р.)"
                  :readonly="true"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="item.cost_sum"
                  label="Прочие расходы(р.)"
                  :readonly="true"
                />
              </v-col>
            </template>
            <template v-else>
              <v-row
                class="mt-0"
                v-for="(subItem, subIndex) in Object.keys(item)"
                :key="subIndex"
              >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Назначение {{ subItem }} на дату
                      {{ convertData(item[subItem].info.date_target) }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row
                        v-for="(service, serviceIndex) in item[subItem].data"
                        :key="serviceIndex"
                      >
                        <v-col cols="12" sm="6">
                          <v-select
                            style="z-index: 10000"
                            :items="list.service"
                            item-text="name"
                            item-value="id"
                            label="Наименование"
                            v-model="service.service_id"
                            persistent-hint
                            clearable
                            :readonly="true"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="service.qty"
                            label="QTY"
                            :readonly="true"
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="service.price"
                            label="Тариф"
                            :readonly="true"
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="service.sum"
                            label="Сумма"
                            :readonly="true"
                          />
                        </v-col>
                      </v-row>
                      <v-list-item-title class="current text-end"
                        >Итого: {{ getFinalSum(item[subItem].data) }}р.
                      </v-list-item-title>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </template>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
