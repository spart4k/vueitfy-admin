<template>
  <transition name="context-open">
    <div
      :class="options.isShow ? 'v-contextmenu--show' : 'v-contextmenu--hide'"
      :style="{
        top: options.y + 'px',
        [options.direction]: options.x + 'px',
      }"
      class="v-contextmenu"
    >
      <div class="v-contextmenu-wrap">
        <!--<div
          v-for="(action, actionsIndex) in options.actions.actions"
          :key="actionsIndex"
          class="v-contextmenu-item"
        >
          <v-icon class="mr-2">{{ action.url }}</v-icon>

        </div>-->
        <v-btn
          v-for="(action, actionsIndex) in availableContext"
          :key="actionsIndex"
          class="v-contextmenu-item d-flex justify-start"
          block
          @click="handlerClick(action)"
          :disabled="isReadonly(action)"
        >
          <v-icon left>
            {{ action.icon }}
          </v-icon>
          <p>{{ action.label }}</p>
        </v-btn>
      </div>
    </div>
  </transition>
</template>

<script src="./setup.js"></script>
