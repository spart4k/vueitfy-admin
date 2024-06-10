<template>
  <div class="colorpicker">
    <v-text-field
      v-model="color"
      :readonly="readonly"
      :disabled="true"
      variant="underlined"
      :label="field.label"
    >
      <template v-slot:append>
        <v-menu
          v-model="menu"
          top
          nudge-bottom="105"
          nudge-left="16"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <div class="colorIcon" :style="swatchStyle" v-on="on" />
          </template>
          <v-card>
            <v-card-text class="pa-0">
              <v-color-picker class="picker" v-model="proxyVal" flat />
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
    </v-text-field>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
