<template>
  <div class="output">
    <!-- <div class="">{{ switchLabel(serviceKey) }}</div>
    <v-row v-for="row in service">
      <div class="output">
        <div class="output-services">
          <v-row v-for="service in row.services">
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.price"
                label="Наименование"
                :readonly="true"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.price"
                label="QTY"
                :readonly="true"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.price"
                label="Тариф"
                :readonly="true"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.price"
                label="Сумма"
                :readonly="true"
              />
            </v-col>
          </v-row>
          <div
            class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
          >
            <a target="_blank" :href="`/payment/${row.payment_id}`">Ссылка</a>
            <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
              {{ row.sum }}
            </div>
          </div>
        </div>
      </div>
    </v-row> -->
    <v-expansion-panels class="output">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div class="output-label d-flex flex">
            {{ switchLabel(serviceKey) }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="row in service">
            <div class="output">
              <div class="output-services">
                <v-row v-for="service in row.service">
                  <v-col cols="12" sm="6">
                    <!-- {{ listService }} -->
                    <!-- <v-text-field
                      v-model="service.service_id"
                      label="Наименование"
                      :readonly="true"
                    /> -->
                    <v-select
                      style="z-index: 10000"
                      :items="listService"
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
                <div
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  <a target="_blank" :href="`/payment/${row.payment_id}`"
                    >Ссылка на начисления</a
                  >
                  <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
                    {{ row.sum }} р
                  </div>
                </div>
              </div>
            </div>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
