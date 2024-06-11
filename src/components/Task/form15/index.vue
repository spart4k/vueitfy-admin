<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center">
        Назначение
        <span @click="pushToForm(entity.id)" class="col-btn form-link"
          >&nbsp;№{{ entity.id }}&nbsp;</span
        >
        на дату
        {{ dateTarget }}
      </v-card-title>
      <TextInfo :infoObj="infoObj" />
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" small color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        :loading="loading"
        @click="confirm"
        class="mr-2"
        small
        color="info"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn :loading="loading" @click="reject" small color="error">
        <v-icon small>mdi-close</v-icon>
        Отклонить
      </v-btn>
    </v-row>
    <component
      :is="Popup"
      :options="{
        width: proxyConfig.detail.width,
        portal: 'table-detail',
      }"
      v-if="
        proxyConfig.detail &&
        proxyConfig.detail.type === 'popup' &&
        popupForm.isShow
      "
    >
      <router-view
        :detail="proxyConfig.detail"
        :class="[
          ...proxyConfig.detail.bootstrapClass,
          ...proxyConfig.detail.classes,
        ]"
        @closePopup="closePopupForm"
      />
    </component>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
