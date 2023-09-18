<template>
  <div
    :class="[
      'v-container',
      'd-flex',
      $props.activeMail.id && 'v-container__expand',
    ]"
  >
    <template v-if="$props.activeMail.id">
      <div class="v-container-column v-container-column__expand">
        <div class="v-container-column-items">
          <template v-for="item in $props.data">
            <MailsLetter
              :companyColor="item.company.color"
              :data="mail"
              :active="$props.activeMail.id === mail.id"
              v-for="(mail, index) in item.mail"
              :key="index"
            />
          </template>
        </div>
      </div>
      <div class="v-container-expanded">
        <MailsLetterExpanded :activeMail="$props.activeMail" />
      </div>
    </template>
    <template v-if="!$props.activeMail.id">
      <!-- {{ $props.data }} -->
      <div
        class="v-container-column d-flex flex-column"
        v-for="(item, index) in $props.data"
        :key="index"
      >
        <div class="v-container-column-title">{{ item.company.name }}</div>
        <div class="v-container-column-items">
          <MailsLetter
            :companyColor="item.company.color"
            :data="mail"
            v-for="(mail, index) in item.mail"
            :key="index"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
