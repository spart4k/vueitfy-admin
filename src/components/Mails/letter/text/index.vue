<template>
  <div :class="['v-text', $route.query.compose === 'answer' && 'v-text__edit']">
    <div class="v-text-title mb-1" v-if="$route?.query?.filter === 'sent'">
      Письмо для {{ $props?.data?.message_to }}
    </div>
    <div class="v-text-files">
      <MailsLetterFiles :data="$props?.data" expand />
    </div>
    <div class="v-text-title mb-1">{{ $props?.data?.subject }}</div>
    <iframe
      class="v-text-text mb-1 flex-grow-1"
      ref="iframe"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
