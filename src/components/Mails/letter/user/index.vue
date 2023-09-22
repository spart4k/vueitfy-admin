<template>
  <div class="v-upper">
    <div class="mr-4">
      <v-icon class="mb-2 pb-1" small>$IconBookmark</v-icon>
      <v-checkbox
        v-if="!$props.expanded"
        color="primary"
        :value="$props.selectedMails.includes($props.data.id)"
        class="v-upper_checkbox"
        @change="$parent.$parent.$emit('changeSelection', $props.data.id)"
      ></v-checkbox>
    </div>
    <div class="v-upper-user d-flex">
      <v-img
        class="v-upper-user_image"
        src="https://cdn.vuetifyjs.com/images/john.png"
      ></v-img>
      <div class="d-flex flex-column ml-1">
        <div class="v-upper-user_name">Kira Zamorevich</div>
        <div class="v-upper-user_email">kira-zamor@email.com</div>
      </div>
    </div>
    <div class="flex-grow-1">
      <div class="v-upper-viewed mt-5 ml-3 mr-2"></div>
    </div>
    <div class="v-upper-favorites mt-3">
      <v-icon small>$IconStarMail</v-icon>
    </div>
    <div class="v-upper-date d-flex flex-column mt-4 ml-3">
      <div class="v-upper-date_day">13 фев</div>
      <div class="v-upper-date_time">13:45:30</div>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
