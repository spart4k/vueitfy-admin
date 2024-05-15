<template>
  <div class="v-card-container">
    {{ data }}
    <div class="v-card-container-card">
      <Card :data="data" />
      <div
        v-if="data.status_name === 'Заблокирована'"
        class="v-card-container-card-disabled"
      >
        <div class="v-card-container-card-disabled-info">
          <v-icon color="cardBackground" class="mr-3">mdi-lock-outline </v-icon
          ><span class="font-weight-bold">Заблокировано</span>
        </div>
      </div>
    </div>
    <div class="v-card-container-info">
      <div
        :class="[
          'font-weight-bold',
          'text-center',
          'mb-2',
          !data.id && 'gradient',
        ]"
      >
        {{ data.org ?? 'Название организации' }}
      </div>
      <div class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Кому выдано</span
        >
        <span :class="!data.id && 'gradient'">{{ data.account_name }}</span>
      </div>
      <div class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Дата выдачи</span
        >
        <span :class="!data.id && 'gradient'">23.04.2024</span>
      </div>
      <div class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Дата изъятия</span
        >
        <span :class="!data.id && 'gradient'">23.04.2025</span>
      </div>
    </div>
    <v-divider class="mt-6 mb-2"></v-divider>
    <div :class="['v-card-container-actions']">
      <span :class="[!data.id && 'gradient']">
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
      </span>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
