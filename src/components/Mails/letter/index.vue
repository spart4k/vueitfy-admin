<template>
  <div
    :class="[
      'v-letter',
      $props.active && 'v-letter__active',
      $route.query.filter === 'folder' && 'v-letter__wide',
    ]"
    @click.prevent="$parent.$emit('setActiveMail', $props.data)"
  >
    <div class="v-letter-left">
      <v-icon class="mb-2 pb-1" small>$IconBookmark</v-icon>
      <v-checkbox
        color="primary"
        :value="$props.selectedMails.includes($props.data.id)"
        class="v-letter-left_checkbox"
        @change="$parent.$emit('changeSelection', $props.data.id)"
      ></v-checkbox>
      <div
        :style="{ backgroundColor: $props.companyColor }"
        class="v-letter-left_color-mark"
      ></div>
    </div>
    <!-- <div @click.stop class="v-letter-upper">
      <MailsLetterUser :selectedMails="selectedMails" :data="$props.data" />
    </div>
    <div class="v-letter-bottom d-flex">
      <div class="v-letter-bottom-info d-flex flex-column mt-3">
        <p class="v-letter-bottom-info-title">СРМ-100</p>
        <p class="v-letter-bottom-info-text">
          Текст сообщения в карточке письма. В нем ограничены символы. Ведь все
          письо не поместиться тут. Примерно 200 символов. Текст сообщения в
          карточке письма.
        </p>
        <div class="v-letter-bottom-info-container d-flex">
          <div class="v-letter-bottom-info-container-files d-flex">
            <div class="v-letter-bottom-info-container-files_item">
              <img src="../../../../src/assets/image/doc.png" alt="" />
            </div>
            <div class="v-letter-bottom-info-container-files_item">
              <img src="../../../../src/assets/image/pdf.png" alt="" />
            </div>
            <div class="v-letter-bottom-info-container-files_item">
              <img src="../../../../src/assets/image/xls.png" alt="" />
            </div>
            <div class="v-letter-bottom-info-container-files_additional-item">
              +2
            </div>
          </div>
          <div class="v-letter-bottom-info-container-color-marks d-flex">
            <div class="v-letter-bottom-info-container-color-marks_item"></div>
            <div class="v-letter-bottom-info-container-color-marks_item"></div>
            <div class="v-letter-bottom-info-container-color-marks_item"></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
