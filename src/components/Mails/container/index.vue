<template>
  <div :class="['v-container', 'd-flex']">
    <!-- {{ $props.selectedMails }} -->
    <div
      :class="[
        'v-container-box',
        $route.query.mail && 'v-container-box__active',
      ]"
      v-if="$route.query.compose !== 'new'"
    >
      <div
        :class="[
          'v-container-box-column',
          'd-flex',
          'flex-column',
          $route.query.filter === 'folder' &&
            'v-container-box-column__horizontal',
        ]"
      >
        <div v-if="false" class="v-container-box-column-title">
          {{ item.name }}
        </div>
        <div class="v-container-box-column-items">
          <template v-if="item.mails">
            <MailsLetter
              :companyColor="item.color"
              :data="mail"
              :active="Number($route.query.mail) === mail.id"
              v-for="(mail, index) in $props.data[0].mails"
              :key="index"
              :selectedMails="selectedMails"
            />
          </template>
          <template v-else>
            <div class="v-container-box-column-items_stub">
              <p>Нет писем</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      v-if="$route.query.mail || $route.query.compose === 'new'"
      class="v-container-expanded"
    >
      <MailsLetterExpanded />
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
