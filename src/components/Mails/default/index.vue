<template>
  <div class="v-mails d-flex flex-row">
    <!-- <div class="v-mails-filters"></div> -->
    <MailsFilters class="mr-4" :data="$props?.data.pageCases" />
    <div class="v-mails-group d-flex flex-column">
      <MailsControls class="mb-2" />
      <MailsContainer />
      <!-- <div class="v-mails-group-controls"></div>
      <div class="v-mails-group-container"></div> -->
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
