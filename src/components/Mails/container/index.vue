<template>
  <div :class="['v-container', 'd-flex', $props.edit && 'v-container__expand']">
    <template v-if="$props.edit">
      <div class="v-container-column v-container-column__expand">
        <div class="v-container-column-items">
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
        </div>
      </div>
      <div class="v-container-expanded">
        <MailsLetterExpanded />
      </div>
    </template>
    <template v-if="!$props.edit">
      <div class="v-container-column d-flex flex-column">
        <div class="v-container-column-title">el-plaza</div>
        <div class="v-container-column-items">
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
        </div>
      </div>
      <div class="v-container-column d-flex flex-column">
        <div class="v-container-column-title">el-plaza</div>
        <div class="v-container-column-items">
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
        </div>
      </div>
      <div class="v-container-column d-flex flex-column">
        <div class="v-container-column-title">el-plaza</div>
        <div class="v-container-column-items">
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
          <MailsLetter />
        </div>
      </div>
    </template>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
