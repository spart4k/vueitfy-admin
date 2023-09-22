<template>
  <div class="v-controls">
    <div class="v-controls-list">
      <v-checkbox
        color="primary"
        class="v-controls-list_item v-controls-list_item__input"
        @change="$emit('changeSelection', 'all')"
        :value="$props.selectedAllMails"
      ></v-checkbox>
      <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconBroadcast</v-icon>
        Транслировать
      </v-btn>
      <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" x-small
          >$IconCheckoutMessage</v-icon
        >
        Прочитано
      </v-btn>
      <v-btn
        class="v-controls-list_item"
        id="menu-activator"
        color="text"
        plain
      >
        <v-icon color="disabled" class="mr-3" small>$IconSystem</v-icon>
        В папку
      </v-btn>
      <v-menu
        v-if="$props.filterData.folderData.length"
        content-class="v-controls-list_menu"
        activator="#menu-activator"
      >
        <v-list>
          <v-list-item
            v-for="item in $props.filterData.folderData"
            :key="item.id"
            class="v-controls-list_menu-item"
            >{{ item.name }}</v-list-item
          >
        </v-list>
      </v-menu>
      <!-- {{ $props.data.colors }} -->
      <v-btn
        class="v-controls-list_item"
        id="tags-activator"
        color="text"
        plain
      >
        <v-icon color="disabled" class="mr-3" small>$IconTag</v-icon>
        Тэг
      </v-btn>
      <v-menu content-class="v-controls-list_tags" activator="#tags-activator">
        <v-list>
          <v-list-item
            v-for="item in $props.filterData.tagsData"
            :key="item.id"
            :style="{ background: item.color }"
            :class="[
              'v-controls-list_tags-item',
              false && 'v-controls-list_tags-item__active',
            ]"
          ></v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconTag</v-icon>
        Тэг
      </v-btn> -->
      <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconDelete</v-icon>
        Удалить
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
