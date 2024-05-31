<template>
  <div class="v-scene">
    <div
      class="v-card"
      :class="[flipped && 'v-card__flipped', !data.id && 'v-card__default']"
      :style="{
        background: cardStyle?.background,
        borderColor: cardStyle?.border,
      }"
    >
      <div
        class="v-card-side v-card-side__front d-flex justify-space-between flex-column"
      >
        <v-row class="justify-space-between">
          <div :class="['v-card-side_image', !data.id && 'gradient']">
            <img
              v-if="cardStyle"
              :src="require(`@/assets/image/bank/${cardStyle?.image}`)"
            />
            <div v-else>{{ data.bank_name }}</div>
          </div>
          <div
            v-if="data.status_id !== 2"
            :class="['v-card-side-actions', !data.id && 'gradient']"
          >
            <v-menu v-if="data.note" open-on-hover left offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon x-small>
                  <v-icon small :color="cardStyle?.actions"
                    >mdi-alert-circle-outline</v-icon
                  >
                </v-btn>
              </template>
              <div class="v-card-side-actions-menu">
                <span class="font-weight-bold">Примечание</span>
                <div class="v-card-side-actions-menu_comment mt-3">
                  {{ data.note }}
                </div>
              </div>
            </v-menu>
            <v-btn @click="flipped = !flipped" class="ml-2" icon x-small>
              <v-icon small :color="cardStyle?.actions">$IconUpdate</v-icon>
            </v-btn>
          </div>
        </v-row>
        <div>
          <span
            :class="['v-card-side_number', !data.id && 'gradient']"
            :style="{
              color: cardStyle?.text,
            }"
            >{{
              data.num?.replace(/(\d{4}(?!\s))/g, '$1 ') ??
              '0000 0000 0000 0000'
            }}</span
          >
          <v-row
            style="margin-top: 10px"
            class="justify-space-between align-end"
          >
            <span
              :class="['v-card-side_name', !data.id && 'gradient']"
              :style="{
                color: cardStyle?.text,
              }"
              >{{ data.fio ?? 'Иванов Иван Иванович' }}</span
            >
            <span
              :class="['v-card-side_validity', 'mr-2', !data.id && 'gradient']"
              :style="{
                color: cardStyle?.text,
              }"
              >{{ data.date_valid ?? '00/00' }}</span
            >
          </v-row>
        </div>
      </div>

      <div class="v-card-side v-card-side__back">
        <div class="v-card-side_upper">
          <v-btn @click="flipped = !flipped" icon x-small>
            <v-icon small :color="cardStyle?.actions"
              >$IconUpdate</v-icon
            ></v-btn
          >
        </div>
        <div class="v-card-side_magnetic"></div>
        <div class="v-card-side-backInfo">
          <div class="d-flex align-center">
            <div class="v-card-side-backInfo_signature"></div>
            <span
              class="v-card-side-cvv"
              :style="{
                color: cardStyle?.cvv,
              }"
              >{{ data.csv }}</span
            >
          </div>
          <div class="v-card-side-backInfo_image">
            <img
              v-if="cardStyle?.image"
              :src="require(`@/assets/image/bank/${cardStyle?.image}`)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
