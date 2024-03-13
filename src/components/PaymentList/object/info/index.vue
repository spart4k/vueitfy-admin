<template>
  <div class="object">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="personal-expension-head">
          <div class="personal-head">
            <div class="personal-head-info">
              <span>Выработка</span>
            </div>
            <div class="personal-head-panel"></div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ObjectInfoOutput />
          <ObjectInfoOverpayment />
          <ObjectInfoConsumption />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
