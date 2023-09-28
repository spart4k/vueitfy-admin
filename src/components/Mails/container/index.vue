<template>
  <div :class="['v-container', 'd-flex']">
    <div
      :class="[
        'v-container-box',
        $route?.query?.mail && 'v-container-box__active',
      ]"
      v-if="$route?.query?.compose !== 'new'"
    >
      <div
        :class="[
          'v-container-box-column',
          'd-flex',
          'flex-column',
          ($route?.query?.filter === 'folder' ||
            $route?.query?.filter === 'box') &&
            'v-container-box-column__horizontal',
        ]"
        v-for="item in $props.data"
        :key="item.id"
      >
        <div
          v-if="
            !(
              $route?.query?.filter === 'folder' ||
              $route?.query?.filter === 'box'
            )
          "
          class="v-container-box-column-title"
        >
          {{ item.name }}{{ item.id }}
        </div>
        <div class="v-container-box-column-items">
          <template v-if="item.mails && item.mails.length">
            <MailsLetter
              :companyColor="item.color"
              :data="mail"
              :active="Number($route.query.mail) === mail.id"
              v-for="(mail, index) in item.mails"
              :key="index"
              :tagsData="$props.tagsData"
              :selectedMails="selectedMails"
              @setActiveMail="setActiveMail"
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
      <MailsLetterExpanded :data="activeMail" />
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
