<template>
  <div class="v-mails d-flex">
    <MailsFilters class="mr-4" slot-scope="" :data="$props?.data?.filters" />
    <div class="v-mails-group">
      <MailsControls @changeSelection="changeSelection" class="mb-2" />
      <div class="d-flex w-100 h-100">
        <!-- {{ selectedMails }}
        {{ allMailsLength }} -->
        <MailsContainer
          @setActiveMail="setActiveMail"
          @changeSelection="changeSelection"
          :data="mailsData"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
