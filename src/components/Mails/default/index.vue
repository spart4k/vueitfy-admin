<template>
  <div class="v-mails d-flex">
    <!-- <div class="v-mails-filters"></div> -->
    <MailsFilters class="mr-4" :data="$props?.data.pageCases" />
    <div class="v-mails-group">
      <MailsControls class="mb-2" />
      <!-- <div class="d-flex"> -->
      <div class="d-flex w-100 h-100">
        <MailsContainer edit />
      </div>
      <!-- <MailsLetterExpanded edit class="mb-4" /> -->
      <!-- </div> -->
      <!-- <div class="v-mails-group-controls"></div>
      <div class="v-mails-group-container"></div> -->
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
