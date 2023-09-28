<template>
  <div class="v-mails d-flex">
    <MailsFilters
      :filterData="filterData"
      @editFilter="editFilter"
      @deleteFilter="deleteFilter"
      class="mr-4"
    />
    <div class="v-mails-group">
      <MailsControls
        :filterData="filterData"
        :selectedAllMails="selectedAllMails"
        :selectedMails="selectedMails"
        @changeSelection="changeSelection"
        class="mb-2"
      />
      <div class="d-flex w-100 h-100">
        <MailsContainer
          v-if="mailsData.length"
          @setActiveMail="setActiveMail"
          @changeSelection="changeSelection"
          @changeMailKey="changeMailKey"
          @decreaseUnreadMailsCount="decreaseUnreadMailsCount"
          :tagsData="filterData.tagsData"
          :selectedMails="selectedMails"
          :data="mailsData"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
