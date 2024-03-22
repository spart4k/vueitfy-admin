<template>
  <div class="object">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel>
        <v-expansion-panel-header class="object-expension-head">
          <div class="object-head">
            <div class="object-head-info">
              <!-- <v-checkbox
                @click="(event) => event.stopPropagation()"
                class=""
              ></v-checkbox> -->
              <span>{{ object.name }}</span>
              <v-chip
                class="object-head-info__total mr-2"
                color="green"
                variant="flat"
              >
                {{ object.total }}р
              </v-chip>
            </div>
            <div class="object-head-panel"></div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <InfoOutput
            :period="period"
            :personalId="personalId"
            :object="object"
          />
          <InfoOverpayment
            :period="period"
            :personalId="personalId"
            :object="object"
          />
          <InfoConsumption
            :period="period"
            :personalId="personalId"
            :object="object"
          />
          <!-- <ObjectInfo /> -->
          <Total v-if="showTotal" :info="total" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
