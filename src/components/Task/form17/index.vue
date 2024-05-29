<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Назначение
        <span @click="pushToForm(entity.id)" class="col-btn form-link"
          >&nbsp;№{{ entity.id }}&nbsp;</span
        >на дату {{ dateTarget }}
      </v-card-title>
      <div
        v-if="
          data.entity.doljnost_id === 5 ||
          data.entity.doljnost_id === 6 ||
          data.entity.doljnost_id === 7 ||
          data.entity.doljnost_id === 8 ||
          data.entity.doljnost_id === 32 ||
          data.entity.doljnost_id === 33
        "
      >
        <TextInfo :infoObj="infoObj" class="mb-5" />
        <!-- ($entity['doljnost_id'] == 5 || $entity['doljnost_id'] == 7 || $entity['doljnost_id'] == 32) -->
        <b class="fw-bold">Приложите выработку:</b>

        <Dropzone
          :options="{
            withoutSave: false,
            folder: 'tmp',
            removeble: false,
          }"
          @addFiles="addFiles"
        ></Dropzone>
      </div>
      <!-- <div v-if="data.entity.doljnost_id == 6 || data.entity.doljnost_id == 49"> -->
      <div
        v-else-if="
          data.entity.direction_id === 6 || data.entity.direction_id === 7
        "
      >
        <FormError class="mb-4" v-if="rejectedTarif">
          Отсутствует тариф на услугу: {{ rejectedTarif }}
        </FormError>
        <div>
          <v-row>
            <div>
              <span>Укажите выработку за смену:</span>
              <!-- <v-select
              :label="data.entity.doljnost_name"
              v-model="selectName"
              disabled
            >
            </v-select> -->
            </div>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pl-0" cols="12" sm="6">
              <Autocomplete
                :readonly="autocompleteConfig.readonly"
                :field="autocompleteConfig"
                @change="(idService) => changeServiceDetail(idService)"
                v-model="selectName"
              />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field label="QTY" v-model="qty"></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="tariff"
                disabled
                label="Тариф"
              ></v-text-field>
            </v-col>
            <v-col class="pr-0" cols="12" sm="2">
              <v-text-field label="Сумма" v-model="sum" disabled></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" color="blue-grey" small>
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        v-if="
          data.entity.doljnost_id == 5 ||
          data.entity.doljnost_id === 6 ||
          data.entity.doljnost_id === 7 ||
          data.entity.doljnost_id === 8 ||
          data.entity.doljnost_id === 32 ||
          data.entity.doljnost_id === 33
        "
        :disabled="!isSetTask && tariff"
        class="mr-2"
        small
        color="info"
        @click="completeTask"
      >
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn
        v-if="data.entity.direction_id == 6 || data.entity.direction_id == 7"
        :disabled="!changeQTY || (data.entity.direction_id == 7 && !tariff)"
        color="info"
        @click="completeTask"
        small
      >
        <v-icon left small> $IconMain </v-icon>
        Завершить
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
