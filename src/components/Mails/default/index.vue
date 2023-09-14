<template>
  <div class="v-mails d-flex">
    <MailsFilters class="mr-4" :data="$props?.data.filters" />
    <div class="v-mails-group">
      <MailsControls class="mb-2" />
      <div class="d-flex w-100 h-100">
        <MailsContainer edit />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
