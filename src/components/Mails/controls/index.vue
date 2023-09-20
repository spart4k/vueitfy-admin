<template>
  <div class="v-controls">
    <div class="v-controls-list">
      <v-checkbox
        color="primary"
        class="v-controls-list_item v-controls-list_item__input"
        @change="$emit('changeSelection', 'all')"
        v-model="allSelection"
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
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn class="v-controls-list_item" v-bind="props" color="text" plain>
            <v-icon color="disabled" class="mr-3" small>$IconSystem</v-icon>
            В папку
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>hjgjhg</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconSystem</v-icon>
        В папку
      </v-btn> -->
      <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconTag</v-icon>
        Тэг
      </v-btn>
      <v-btn class="v-controls-list_item" color="text" plain>
        <v-icon color="disabled" class="mr-3" small>$IconDelete</v-icon>
        Удалить
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
