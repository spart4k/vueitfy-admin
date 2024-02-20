<template>
  <div class="output">
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
                  v-if="sum(row) !== row.sum"
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  <div class="">Сумма</div>
                  <div class="output-summ">{{ row.sum }} р</div>
                </div>
                <div
                  v-if="row.deduction_debit"
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  <div class="">Дебит</div>
                  <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
                    {{ row.deduction_debit }} р
                  </div>
                </div>
                <div
                  v-if="row.hold_sum"
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  <div class="">Удержано</div>
                  <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
                    {{ row.hold_sum }} р
                  </div>
                </div>
                <div
                  v-if="!row.is_hold"
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  <a
                    v-if="row.payment_id"
                    target="_blank"
                    :href="`/payment/${row.payment_id}`"
                    >Ссылка на начисления</a
                  >
                  <div v-else class=""></div>
                  <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
                    {{ sum(row) }} р
                  </div>
                </div>
                <!-- <div
                  class="output-panel d-flex align-start justify-space-between pl-3 pr-3"
                >
                  
                  <div :class="row.is_hold ? 'debt' : ''" class="output-summ">
                    {{ row.sum }} р
                  </div>
                </div> -->
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
