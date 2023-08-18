<template>
  <transition name="context-open">
    <div
      :class="options.isShow ? 'v-contextmenu--show' : 'v-contextmenu--hide'"
      :style="{
        top: options.y,
        [options.direction]: options.x,
      }"
      class="v-contextmenu"
    >
      <div class="v-contextmenu-wrap">
        <div
          v-for="(action, actionsIndex) in options.actions.actions"
          :key="actionsIndex"
          class="v-contextmenu-item"
        >
          <img :src="action.urlIcon" alt="" />
          <p>{{ action.label }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./index.js"></script>
