<template>
  <div class="v-mails d-flex">
    <MailsFilters
      class="mr-4"
      @resetActiveMail="resetActiveMail"
      slot-scope=""
      :data="$props?.data?.filters"
    />
    <div class="v-mails-group">
      <MailsControls class="mb-2" />
      <div class="d-flex w-100 h-100">
        <MailsContainer
          @setActiveMail="setActiveMail"
          :data="$props?.data?.mails"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
