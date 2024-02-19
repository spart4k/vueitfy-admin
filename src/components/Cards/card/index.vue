<template>
  <div class="v-scene">
    <div
      class="v-card"
      :class="[flipped && 'v-card__flipped']"
      :style="{
        background: cardStyle.background,
        borderColor: cardStyle.border,
      }"
    >
      <div
        class="v-card-side v-card-side__front d-flex justify-space-between flex-column"
      >
        <v-row class="justify-space-between">
          <div class="v-card-side_image">
            <img :src="require(`@/assets/image/bank/${cardStyle.image}`)" />
          </div>
          <div>
            <v-icon x-small :color="cardStyle.actions">$IconEdit</v-icon>
            <v-icon
              @click="flipped = !flipped"
              x-small
              class="ml-3"
              :color="cardStyle.actions"
              >$IconUpdate</v-icon
            >
          </div>
        </v-row>
        <div>
          <span
            class="v-card-side_number"
            :style="{
              color: cardStyle.text,
            }"
            >{{ data.number }}</span
          >
          <v-row
            style="margin-top: 10px"
            class="justify-space-between align-end"
          >
            <span
              class="v-card-side_name"
              :style="{
                color: cardStyle.text,
              }"
              >{{ data.name }}</span
            >
            <span
              class="v-card-side_validity mr-2"
              :style="{
                color: cardStyle.text,
              }"
              >{{ data.validity }}</span
            >
          </v-row>
        </div>
      </div>

      <div class="v-card-side v-card-side__back">
        <div class="v-card-side_magnetic">
          <v-icon @click="flipped = !flipped" x-small color="#D6DBE2"
            >$IconUpdate</v-icon
          >
        </div>
        <div class="v-card-side-backInfo">
          <div class="d-flex align-center">
            <div class="v-card-side-backInfo_signature"></div>
            <span
              class="v-card-side-cvv"
              :style="{
                color: cardStyle.cvv,
              }"
              >{{ data.cvv }}</span
            >
          </div>
          <div class="v-card-side-backInfo_image">
            <img :src="require(`@/assets/image/bank/${cardStyle.image}`)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
