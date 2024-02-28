<template>
  <div class="">
    <div class="switch">
      <div class="switch-wrap">
        <div
          v-for="(tab, tabIndex) in button.values"
          :key="tabIndex"
          class="switch-tab"
          :class="proxyValue === tab.value ? 'switch-tab--active' : ''"
          @click="handlerSwitch(tab)"
        >
          {{ tab.label }}
        </div>
        <div class="switch-thumb"></div>
        <!-- <div class="switch-tab">{{ tab.label }}</div> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>
