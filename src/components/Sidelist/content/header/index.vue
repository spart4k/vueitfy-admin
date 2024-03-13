<template>
  <div class="pl-7 pr-7">
    <div class="v-heading">
      <v-btn
        class="v-heading_item v-heading_item__left"
        icon
        x-small
        @click="$emit($props.stage ? 'changeStage' : 'closePanel')"
      >
        <v-icon small color="disabled">{{
          $props.stage ? '$IconArrowLeft' : '$IconArrowRight'
        }}</v-icon></v-btn
      >
      <div class="v-heading_relative">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="$props.lock"
              icon
              x-small
              v-bind="attrs"
              v-on="on"
              class="v-heading_item v-heading_item__center"
              @click="$emit('changePeriod')"
            >
              <v-icon :color="$props.lock?.color" small
                >$IconLock</v-icon
              ></v-btn
            >
          </template>
          <span>{{ $props.lock?.tooltip }}</span>
        </v-tooltip>

        {{ $props.data.name }}
      </div>
      <div v-if="$props.date" class="v-heading_item v-heading_item__right">
        {{ $props.date.monthArray[$props.date.month] }}
        {{ $props.date.year }}
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
