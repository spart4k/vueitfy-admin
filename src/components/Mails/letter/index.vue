<template>
  <div
    :class="[
      'v-letter',
      $props.active && 'v-letter__active',
      ($route.query.filter === 'folder' || $route.query.filter === 'box') &&
        !$route.query.mail &&
        'v-letter__wide',
    ]"
    @click="$emit('setActiveMail', $props.data)"
  >
    <div class="v-letter-left">
      <v-icon
        class="v-letter-left_icon"
        :color="$props?.data?.ismain ? 'warning' : ''"
        small
        @click.stop="
          $parent.$emit('changeMailKey', {
            id: $props.data.id,
            ismain: $props.data.ismain,
            box_id: $props?.data?.box_id,
            key: 'ismain',
          })
        "
        >$IconBookmark</v-icon
      >
      <!-- {{ $props.data.id }} -->
      <v-checkbox
        color="primary"
        :value="$props.selectedMails.includes($props.data.id)"
        class="v-letter-left_checkbox"
        @click.stop
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
        <MailsLetterDate :data="$props.data"></MailsLetterDate>
      </div>
      <div class="v-letter-content-info">
        <p class="v-letter-content-info_title">
          {{ $props.data.subject }}
        </p>
        <p
          class="v-letter-content-info_text"
          v-html="$props?.data?.message_text.replace('<br><br><br>', '')"
        ></p>
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
        <template v-if="$props?.data?.tags">
          <div
            class="v-letter-content-tags_item"
            v-for="(item, index) in JSON.parse($props?.data?.tags)"
            :key="index"
            :style="{
              background: $props?.tagsData?.find((x) => x.id === item)?.color,
            }"
            @click.stop="setActiveColorFilter(item)"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
