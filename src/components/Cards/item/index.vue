<template>
  <div class="v-card-container">
    <div class="v-card-container-card">
      <Card :data="$props.data" />
    </div>
    <div class="v-card-container-info">
      <div class="font-weight-bold text-center mb-2">Примекс</div>
      <div class="v-card-container-info_item">
        <span class="font-weight-bold">Кому выдано</span>
        <span class="">Сафонов Евгений</span>
      </div>
      <div class="v-card-container-info_item">
        <span class="font-weight-bold">Дата выдачи</span>
        <span class="">23.04.2024</span>
      </div>
      <div class="v-card-container-info_item">
        <span class="font-weight-bold">Дата изъятия</span>
        <span class="">23.04.2025</span>
      </div>
    </div>
    <v-divider class="mt-6 mb-2"></v-divider>
    <div class="v-card-container-actions">
      <v-menu class="v-card-container-actions_item" left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            color="transparent"
            elevation="0"
          >
            <v-icon color="gray" dense>$IconEtc </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn color="transparent" elevation="0">
              <v-icon color="textDefault" dense>$IconAdd </v-icon> Выдать
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="transparent" elevation="0">
              <v-icon color="textDefault" dense> mdi-history </v-icon>
              Заблокировать
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="transparent" elevation="0">
              <v-icon color="textDefault" dense> mdi-cancel </v-icon> История
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        class="v-card-container-actions_item"
        large
        color="error"
        elevation="0"
      >
        <v-icon dense>$IconDelete </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
