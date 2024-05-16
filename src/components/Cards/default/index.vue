<template>
  <div class="v-cards-wrapper">
    <div class="v-cards-wrapper-panel">
      <div class="v-cards-wrapper-panel-left">
        <v-btn disabled elevation="0" plain color="primary">
          <v-icon left> mdi-view-grid </v-icon>
          Сетка
        </v-btn>
        <v-btn @click="$emit('changeComp')" plain elevation="0" class="ml-3">
          <v-icon left> mdi-view-list </v-icon>
          Список
        </v-btn>
        <v-btn @click="changeTab" plain elevation="0" class="ml-3">
          <v-icon left>
            {{ isArchive ? 'mdi-briefcase' : 'mdi-archive' }}
          </v-icon>
          {{ isArchive ? 'Активные' : 'Архив' }}
        </v-btn>
      </div>
      <div class="v-cards-wrapper-panel-right">
        <v-text-field
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          dense
          clearable
          v-model="searchField"
          @input="getItems"
        ></v-text-field>
      </div>
    </div>
    <div
      v-if="loading"
      class="text-center d-flex align-center justify-center flex-grow-1"
    >
      <v-progress-circular color="primary" :size="80" indeterminate />
    </div>
    <div v-else class="v-cards-wrapper-container">
      <div class="v-cards-wrapper-container_list">
        <CardsNew v-if="addPermission && !isArchive" @createItem="createItem" />
        <CardsItem
          @cardChange="cardChange"
          @openItem="openItem"
          v-for="item in items"
          :data="item"
          :key="item.id"
          :id="item.index ?? item.id"
          :isArchive="isArchive"
          class=""
          :addPermission="addPermission"
          v-intersect.once="item.intersecting && getPage"
        />
      </div>
    </div>

    <v-dialog persistent v-model="dialog.isShow" width="550">
      <v-card>
        <div class="pt-3 mb-4 text-h5 text-center">
          {{ dialog.text }}
        </div>
        <v-card-actions class="pb-4 flex justify-center">
          <v-btn
            v-if="!dialog.loading"
            color="primary mr-4"
            @click="dialog.confirmFunc()"
          >
            Подтверждаю
          </v-btn>
          <v-btn
            v-if="!dialog.loading"
            color="error"
            @click="dialog.isShow = false"
          >
            Отменить
          </v-btn>
          <v-progress-circular
            v-if="dialog.loading"
            color="primary"
            :size="30"
            indeterminate
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Popup
      @close="closePopupForm"
      :options="{
        width: options.detail.width,
        portal: 'table-detail',
      }"
      v-if="
        options.detail && options.detail.type === 'popup' && popupForm.isShow
      "
    >
      <router-view
        :detail="options.detail"
        :class="[...options.detail.bootstrapClass, ...options.detail.classes]"
        @closePopup="closePopupForm"
        @getItems="getItems"
      />
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
