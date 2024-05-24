<template>
  <div @dblclick="$emit('openItem', data.id)" class="v-card-container">
    <div class="v-card-container-card">
      <Card :data="data" />
      <div v-if="data.status_id === 2" class="v-card-container-card-disabled">
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
          >Создано</span
        >
        <span :class="!data.id && 'gradient'">{{
          data.from_account_name
        }}</span>
      </div>
      <div class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Кому выдано</span
        >
        <span :class="!data.id && 'gradient'">{{ data.account_name }}</span>
      </div>
      <div v-if="data.account_id !== 0" class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Дата выдачи</span
        >
        <span :class="!data.id && 'gradient'">{{
          data.date_start ? convertData(data.date_start) : '-' ?? '00.00.0000'
        }}</span>
      </div>
      <div v-if="data.account_id === 0" class="v-card-container-info_item">
        <span :class="['font-weight-bold', !data.id && 'gradient']"
          >Дата изъятия</span
        >
        <span :class="!data.id && 'gradient'">{{
          data.date_end ? convertData(data.date_end) : '-' ?? '00.00.0000'
        }}</span>
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
            <v-list-item v-if="!isArchive && editPermission && !accounting">
              <v-btn
                color="transparent"
                elevation="0"
                @click="$emit('cardChange', { id: data.id, action: 'give' })"
              >
                <v-icon color="textDefault" dense>$IconAdd </v-icon> Выдать
              </v-btn>
            </v-list-item>
            <v-list-item
              v-if="
                !isArchive &&
                editPermission &&
                data.account_id !== 0 &&
                !accounting
              "
            >
              <v-btn
                color="transparent"
                elevation="0"
                @click="$emit('cardChange', { id: data.id, action: 'take' })"
              >
                <v-icon color="textDefault" dense>mdi-minus-thick </v-icon>
                Изъять
              </v-btn>
            </v-list-item>
            <v-list-item
              v-if="!isArchive && editPermission && data.status_id !== 2"
            >
              <v-btn
                color="transparent"
                elevation="0"
                @click="$emit('cardChange', { id: data.id, action: 'lock' })"
              >
                <v-icon color="textDefault" dense> mdi-cancel </v-icon>
                Заблокировать
              </v-btn>
            </v-list-item>
            <v-list-item
              v-if="!isArchive && editPermission && data.status_id === 2"
            >
              <v-btn
                color="transparent"
                elevation="0"
                @click="$emit('cardChange', { id: data.id, action: 'unlock' })"
              >
                <v-icon color="textDefault" dense> mdi-lock-open </v-icon>
                Разблокировать
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                color="transparent"
                elevation="0"
                @click="$emit('cardChange', { id: data.id, action: 'history' })"
              >
                <v-icon color="textDefault" dense> mdi-history</v-icon> История
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="v-card-container-actions_item"
          large
          color="error"
          elevation="0"
          v-if="editPermission && !data.is_archive"
          @click="$emit('cardChange', { id: data.id, action: 'delete' })"
        >
          <v-icon dense>$IconDelete </v-icon>
        </v-btn>
        <v-btn
          class="v-card-container-actions_item"
          large
          color="success"
          elevation="0"
          v-if="editPermission && data.is_archive"
          @click="$emit('cardChange', { id: data.id, action: 'restore' })"
        >
          <v-icon dense>mdi-restore </v-icon>
        </v-btn>
      </span>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
