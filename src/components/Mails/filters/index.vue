<template>
  <div class="v-filters d-flex align-center flex-column">
    <!-- {{ $props.data }} -->
    <h2 class="v-filters-date mt-2">13 ПН</h2>
    <v-btn color="primary" variant="tonal" class="mt-2 mb-7">
      <v-icon small class="mr-2">$IconEdit</v-icon>
      Написать
    </v-btn>
    <div class="v-filters-mail-types-list pl-4 pr-4 mb-4">
      <div
        :class="[
          'v-filters-mail-types-list_item',
          !index && 'v-filters-mail-types-list_item__active',
          'd-flex',
          'align-center',
        ]"
        v-for="(item, index) in $props.data"
        :key="index"
      >
        <v-icon small class="mr-4">{{ item.url }}</v-icon>
        <div :class="['flex-grow-1']">
          {{ item.label }}
        </div>
        <div>
          {{ item.number ? item.number : '' }}
        </div>
      </div>
    </div>
    <v-expansion-panels class="v-filters-folder">
      <v-expansion-panel>
        <v-expansion-panel-header class="v-filters-folder-title"
          ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
          папки</v-expansion-panel-header
        >
        <v-expansion-panel-content class="v-filters-folder-container">
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div
            @click="createFolder"
            class="v-filters-folder-container_item v-filters-folder-container_item__disabled ml-4"
          >
            <v-icon small class="mr-2">$IconSystem</v-icon> Добавить папку
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels accordion class="v-filters-folder mb-3">
      <v-expansion-panel>
        <v-expansion-panel-header class="v-filters-folder-title"
          ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
          ящики</v-expansion-panel-header
        >
        <v-expansion-panel-content class="v-filters-folder-container">
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div class="v-filters-folder-container_item ml-4">
            <v-icon small class="mr-2">$IconSystem</v-icon> Мои папки
          </div>
          <div
            @click="createFolder"
            class="v-filters-folder-container_item v-filters-folder-container_item__disabled ml-4"
          >
            <v-icon small class="mr-2">$IconSystem</v-icon> Добавить папку
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="v-filters-color mb-3">
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
      <div class="v-filters-color_item"></div>
    </div>
    <div class="v-filters-bottom mb-4">
      <v-btn
        color="disabled"
        outlined
        plain
        class="v-filters-bottom_item d-flex align-center"
      >
        <v-icon small>$IconBookmark</v-icon>
      </v-btn>
      <v-btn color="disabled" outlined plain class="v-filters-bottom_item">
        <div class="v-filters-bottom_item-point mr-2"></div>
        20
      </v-btn>
    </div>
    <Popup @close="closePopup" v-if="popupCase">
      <div class="v-filters-popup d-flex flex-column align-center">
        <div class="d-flex">
          <v-icon
            :color="caseColor"
            @click="openPicker = !openPicker"
            large
            class="mr-9 v-filters-popup_icon"
            >$IconSystem</v-icon
          >
          <div v-if="openPicker" class="v-filters-popup_picker">
            <v-color-picker v-model="caseColor" hide-inputs></v-color-picker>
          </div>
          <v-text-field
            v-if="!openPicker"
            max-width="100"
            label="Название"
          ></v-text-field>
        </div>
        <v-btn tonal color="success" class="mt-8">
          <v-icon small class="mr-2">$IconAdd</v-icon>
          Создать
        </v-btn>
      </div>
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
