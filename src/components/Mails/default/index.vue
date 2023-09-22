<template>
  <div class="v-mails d-flex">
    <MailsFilters
      :filterData="filterData"
      @createNewFilter="createNewFilter"
      class="mr-4"
      :data="$props?.data?.filters"
    />
    <div class="v-mails-group">
      <MailsControls
        :filterData="filterData"
        :selectedAllMails="selectedAllMails"
        @changeSelection="changeSelection"
        class="mb-2"
      />
      <div class="d-flex w-100 h-100">
        <MailsContainer
          @setActiveMail="setActiveMail"
          @changeSelection="changeSelection"
          :selectedMails="selectedMails"
          :data="mailsData"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
