<template>
  <div
    :class="[
      'v-letter',
      $props.active && 'v-letter__active',
      $route.query.filter === 'folder' &&
        !$route.query.mail &&
        'v-letter__wide',
    ]"
    @click.prevent="$parent.$emit('setActiveMail', $props.data)"
  >
    <div class="v-letter-left">
      <v-icon class="v-letter-left_icon" small>$IconBookmark</v-icon>
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
    <div class="v-letter-content">
      <div class="v-letter-content-user">
        <MailsLetterUser :data="$props.data" />
      </div>
      <div class="v-letter-content-favorite">
        <div class="v-letter-content-favorite_icon">
          <v-icon small>$IconStarMail</v-icon>
        </div>
        <div class="v-letter-content-favorite-date">
          <div class="v-letter-content-favorite-date_day">13 фев</div>
          <div class="v-letter-content-favorite-date_time">13:45:30</div>
        </div>
      </div>
      <div class="v-letter-content-info">
        <p class="v-letter-content-info_title">СРМ-100</p>
        <p class="v-letter-content-info_text">
          Текст сообщения в карточке письма. В нем ограничены символы. Ведь все
          письо не поместиться тут. Примерно 200 символов. Текст сообщения в
          карточке письма.
        </p>
      </div>
      <div class="v-letter-content-files">
        <div class="v-letter-content-files_item">
          <img src="../../../../src/assets/image/doc.png" alt="" />
        </div>
        <div class="v-letter-content-files_item">
          <img src="../../../../src/assets/image/pdf.png" alt="" />
        </div>
        <div class="v-letter-content-files_item">
          <img src="../../../../src/assets/image/pdf.png" alt="" />
        </div>
        <div class="v-letter-content-files_additional-item">+2</div>
      </div>
      <div class="v-letter-content-tags">
        <div class="v-letter-content-tags_item"></div>
        <div class="v-letter-content-tags_item"></div>
        <div class="v-letter-content-tags_item"></div>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
