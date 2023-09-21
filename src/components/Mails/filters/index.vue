<template>
  <div class="v-filters d-flex align-center flex-column">
    <!-- {{ $props.data }} -->
    <h2 class="v-filters-date mt-2">
      {{ new Date().getDate() }} {{ dayOfWeek[new Date().getDay()] }}
    </h2>
    <v-btn
      @click="createNewMail"
      color="primary"
      variant="tonal"
      class="mt-2 mb-7"
    >
      <v-icon small class="mr-2">$IconEdit</v-icon>
      Написать
    </v-btn>
    <div class="v-filters-mail-types-list pl-4 pr-4 mb-4">
      <div
        :class="[
          'v-filters-mail-types-list_item',
          $route.query.filter === item.query &&
            'v-filters-mail-types-list_item__active',
          'd-flex',
          'align-center',
        ]"
        v-for="(item, index) in $props?.data?.pageCases"
        :key="index"
        @click="setRouterPath({ filter: item.query })"
      >
        <v-icon small class="mr-4">{{ item.url }}</v-icon>
        <div :class="['flex-grow-1']">
          {{ item.label }}
        </div>
        <div>
          {{ item.number ? item.number : null }}
        </div>
      </div>
    </div>
    <v-expansion-panels v-model="boxPanel" class="v-filters-folder">
      <v-expansion-panel>
        <v-expansion-panel-header class="v-filters-folder-title"
          ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
          папки</v-expansion-panel-header
        >
        <v-expansion-panel-content class="v-filters-folder-container">
          <div
            class="v-filters-folder-container_item ml-4"
            v-for="(item, index) in $props?.data?.folders"
            :key="index"
            @click="setRouterPath({ filter: 'box', id: item.id })"
          >
            <v-icon :color="item.color" small class="mr-2">$IconSystem</v-icon>
            <span
              :class="
                $route.query.filter === 'box' &&
                Number($route.query.id) === item.id &&
                'v-filters-folder-container_item__active'
              "
            >
              {{ item.name }}
            </span>
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
    <v-expansion-panels
      v-model="folderPanel"
      accordion
      class="v-filters-folder mb-3"
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="v-filters-folder-title"
          ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
          ящики</v-expansion-panel-header
        >
        <v-expansion-panel-content class="v-filters-folder-container">
          <div
            class="v-filters-folder-container_item ml-4"
            v-for="(item, index) in $props?.data?.cases"
            :key="index"
            @click="setRouterPath({ filter: 'folder', id: item.id })"
          >
            <v-icon :color="item.color" small class="mr-2">$IconSystem</v-icon>
            <span
              :class="
                $route.query.filter === 'folder' &&
                Number($route.query.id) === item.id &&
                'v-filters-folder-container_item__active'
              "
            >
              {{ item.name }}
            </span>
          </div>
          <div
            @click="createFolder"
            class="v-filters-folder-container_item v-filters-folder-container_item__disabled ml-4"
          >
            <v-icon small class="mr-2">$IconSystem</v-icon> Добавить ящик
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="v-filters-color mb-3">
      <div
        :class="[
          'v-filters-color_item',
          $route.query.filter === 'color' &&
            Number($route.query.id) === item.id &&
            'v-filters-color_item__active',
        ]"
        :style="{ backgroundColor: item.color }"
        @click="setRouterPath({ filter: 'color', id: item.id })"
        v-for="(item, index) in $props?.data?.colors"
        :key="index"
      ></div>
    </div>
    <div class="v-filters-bottom mb-4">
      <v-btn
        :color="$route.query.filter === 'tags' ? 'primary' : 'disabled'"
        outlined
        plain
        class="v-filters-bottom_item d-flex align-center"
        @click="setRouterPath({ filter: 'tags' })"
      >
        <v-icon small>$IconBookmark</v-icon>
      </v-btn>
      <v-btn
        @click="setRouterPath({ filter: 'unread' })"
        :color="$route.query.filter === 'unread' ? 'primary' : 'disabled'"
        outlined
        plain
        class="v-filters-bottom_item"
      >
        <div
          :class="[
            'v-filters-bottom_item-point',
            'mr-2',
            $route.query.filter === 'unread' &&
              'v-filters-bottom_item-point__active',
          ]"
        ></div>
        <p class="v-filters-bottom_item-text">
          {{ $props?.data?.unreadeanle }}
        </p>
      </v-btn>
    </div>
    <Popup
      :options="{ portal: 'table-detail' }"
      closeButton
      @close="closePopup"
      v-if="popupCase"
    >
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
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
