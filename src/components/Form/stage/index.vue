<template>
  <div class="form-stage">
    <v-tabs
      style="flex: unset; display: none"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in stages" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="item in stages" :key="item.id">
        <component
          :is="item.type"
          :activeTab="activeTab"
          :tab="item"
          :tabs="stages"
          :detail="tab"
          :options="item.config"
          @nextStage="nextStage"
          @prevStage="prevStage"
          @setStageData="setStageData"
          @closePopup="(e) => $emit('closePopup', e)"
          @getItems="(e) => $emit('getItems', e)"
          :class="item?.label"
        />
        <!--<v-progress-circular
          v-else
          :size="20"
          :width="2"
          color="primary"
          indeterminate
        />-->
        <v-row
          v-if="item.type === 'TableDefault'"
          class="justify-end align-end"
        >
          <v-btn
            type="submit"
            :color="action.color"
            class="ml-2"
            :class="'formStageButton_' + action.text"
            :loading="loading"
            @click.prevent="clickHandler({ action })"
            v-for="action in item.actions"
            :key="action.id"
          >
            {{ action.text }}
          </v-btn>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
