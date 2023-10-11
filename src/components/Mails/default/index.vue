<template>
  <div class="v-mails d-flex">
    <MailsFilters
      :filterData="filterData"
      @editFilter="editFilter"
      @deleteFilter="deleteFilter"
      @setRouterPath="setRouterPath"
      class="mr-4"
    />
    <div class="v-mails-group">
      <MailsControls
        :filterData="filterData"
        :selectedAllMails="selectedAllMails"
        :selectedMails="selectedMails"
        :allSelectionFilter="allSelectionFilter"
        :allMails="allMails"
        @changeSelection="changeSelection"
        @changeMailArrayKey="changeMailArrayKey"
        class="mb-2"
      />
      <div class="v-mails-group-container d-flex w-100 h-100">
        <!-- {{ selectedAllMails }} -->
        <!-- {{ selectedMails }} -->
        <!-- {{ selectedTemporary }} -->
        <!-- {{ allSelectionFilter }} -->
        <MailsContainer
          v-if="mailsData.length"
          @setActiveMail="setActiveMail"
          @changeSelection="changeSelection"
          @changeMailKey="changeMailKey"
          @decreaseUnreadMailsCount="decreaseUnreadMailsCount"
          @getPagination="getPagination"
          @getMails="getMails"
          @setRouterPath="setRouterPath"
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
