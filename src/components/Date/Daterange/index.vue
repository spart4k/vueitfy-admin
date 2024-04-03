<template>
  <div id="attachMenu" style="position: relative" class="date-range">
    <v-row class="d-flex align-start justify-space-between">
      <v-subheader
        :class="[focused && 'isFocus', hasError && 'isError']"
        class="pl-0 date-range-label"
        style="height: unset"
        >{{ field.label }}</v-subheader
      >
    </v-row>
    <v-row style="flex-wrap: nowrap" class="mt-0">
      <v-col
        style="transition: 0.2s"
        class="pl-0"
        cols="12"
        :sm="!isEmpty ? 6 : 6"
      >
        <Datepicker
          v-model="date.start"
          :field="field"
          :error-messages="errorMessages.length ? errorMessages[0][0] : ''"
          :readonly="readonly"
          :placeholder="'От'"
          @focus="onFocus"
          @blur="unFocus"
        ></Datepicker>
      </v-col>
      <v-col
        style="transition: 0.2s"
        class="pr-0"
        cols="12"
        :sm="!isEmpty ? 5 : 6"
      >
        <Datepicker
          v-model="date.end"
          :field="field"
          :error-messages="errorMessages.length ? errorMessages[0][1] : ''"
          :readonly="readonly"
          :placeholder="'По'"
          @focus="onFocus"
          @blur="unFocus"
          edge="right"
        ></Datepicker>
      </v-col>
      <v-col v-if="!isEmpty" class="pr-0" :sm="!isEmpty ? 1 : 0">
        <v-icon @click="resetDate" class="mt-1 mr-1" x-small>$IconClose</v-icon>
      </v-col>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
