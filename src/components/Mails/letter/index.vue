<template>
  <div
    :class="[
      'v-letter',
      $props.active && 'v-letter__active',
      ($route.query.filter === 'folder' ||
        $route.query.filter === 'box' ||
        $route?.query?.filter === 'trans') &&
        !$route.query.mail &&
        'v-letter__wide',
    ]"
  >
    <div
      @click="$emit('setActiveMail', $props.data)"
      class="v-letter-trigger"
    ></div>
    <div class="v-letter-left">
      <v-icon
        v-if="$route.query.filter !== 'sent' && $route.query.filter !== 'trash'"
        class="v-letter-left_icon"
        :color="$props?.data?.is_main ? 'warning' : ''"
        small
        @click.stop="
          $parent.$emit('changeMailKey', {
            id: $props.data.id,
            is_main: $props.data.is_main,
            box_id: $props?.data?.box_id,
            key: 'is_main',
          })
        "
        >$IconBookmark</v-icon
      >
      <v-checkbox
        v-if="$route.query.filter !== 'sent' && $route.query.filter !== 'trash'"
        color="primary"
        :value="$props?.selectedMails?.includes($props.data.id)"
        v-model="checkbox"
        class="v-letter-left_checkbox"
        @click.stop
        @change="$parent.$emit('changeSelection', $props.data.id)"
      ></v-checkbox>
      <div
        :style="{
          backgroundColor: $props?.data?.color_box || 'var(--v-primary-base)',
          marginTop:
            $route.query.filter !== 'sent' && $route.query.filter !== 'trash'
              ? '12px'
              : '0px',
        }"
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
        <!-- <p
          class="v-letter-content-info_text"
          v-html="$props?.data?.message_text?.replace('<br><br><br>', '')"
        ></p> -->
        <iframe
          class="v-letter-content-info_text"
          ref="iframe"
          frameborder="0"
        ></iframe>
      </div>
      <div class="v-letter-content-files">
        <MailsLetterFiles :data="$props?.data" />
      </div>
      <div class="v-letter-content-tags">
        <template v-if="$props?.data?.tags">
          <div
            class="v-letter-content-tags_item"
            v-for="(item, index) in JSON.parse($props?.data?.tags)"
            :key="index"
            :style="{
              background: $props?.tagsData?.find((x) => x.id === Number(item))
                ?.color,
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
