<template>
  <div
    :class="['v-letter', $props.active && 'v-letter__active']"
    @click.prevent="$parent.$emit('setActiveMail', $props.data)"
  >
    <div @click.stop class="v-letter-upper">
      <MailsLetterUser :selectedMails="selectedMails" :data="$props.data" />
    </div>
    <div class="v-letter-bottom d-flex">
      <div
        :style="{ backgroundColor: $props.companyColor }"
        class="v-letter-bottom-color-mark mr-4"
      ></div>
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
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
