<template>
  <div class="v-controls">
    <div class="v-controls-list">
      <v-checkbox
        color="primary"
        class="v-controls-list_item v-controls-list_item__input"
        @change="$emit('changeSelection', 'all')"
        :value="$props.selectedAllMails"
      ></v-checkbox>
      <v-btn
        class="v-controls-list_item"
        color="text"
        :disabled="!$props.selectedMails.length"
        plain
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconBroadcast</v-icon
        >
        Транслировать
      </v-btn>
      <v-btn
        :disabled="!$props.selectedMails.length"
        class="v-controls-list_item"
        color="text"
        plain
        @click="$emit('changeMailArrayKey', 'is_read')"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          x-small
          >$IconCheckoutMessage</v-icon
        >
        Прочитано
      </v-btn>
      <v-btn
        class="v-controls-list_item"
        id="menu-activator"
        color="text"
        plain
        :disabled="!$props.selectedMails.length"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconSystem</v-icon
        >
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
            @click="$emit('changeMailArrayKey', 'folders', item)"
            >{{ item.name }}</v-list-item
          >
        </v-list>
      </v-menu>
      <v-btn
        class="v-controls-list_item"
        id="tags-activator"
        color="text"
        plain
        :disabled="!$props.selectedMails.length"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconTag</v-icon
        >
        Тэг
      </v-btn>
      <v-menu
        v-if="$props.filterData.tagsData.length"
        content-class="v-controls-list_tags"
        activator="#tags-activator"
      >
        <v-list>
          <v-list-item
            v-for="item in $props.filterData.tagsData"
            :key="item.id"
            :style="{ background: item.color }"
            @click="$emit('changeMailArrayKey', 'tags', item)"
            :class="[
              'v-controls-list_tags-item',
              false && 'v-controls-list_tags-item__active',
            ]"
          ></v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        :disabled="!$props.selectedMails.length"
        class="v-controls-list_item"
        color="text"
        plain
        @click="popupCase = true"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconDelete</v-icon
        >
        Удалить
      </v-btn>
    </div>
    <Popup
      :options="{ portal: 'filter', padding: '20px 30px' }"
      closeButton
      @close="popupCase = false"
      v-if="popupCase"
    >
      <div class="v-controls-popup d-flex flex-column align-center">
        <p class="v-controls-popup_title">Удалить письма?</p>
        <div class="d-flex mt-7">
          <v-btn
            @click="
              $emit('changeMailArrayKey', 'del')
              popupCase = false
            "
            tonal
            color="error"
          >
            <v-icon small class="mr-2">$IconDelete</v-icon>
            Удалить
          </v-btn>
          <v-btn @click="popupCase = false" tonal color="primary" class="ml-5">
            <v-icon small class="mr-2">$IconArrowCansel</v-icon>
            Отменить
          </v-btn>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
