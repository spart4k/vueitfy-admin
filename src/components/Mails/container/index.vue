<template>
  <div :class="['v-container', 'd-flex']">
    <div
      :class="[
        'v-container-box',
        $route.query.mail && 'v-container-box__active',
      ]"
      v-if="$route.query.compose !== 'new'"
    >
      <div
        class="v-container-box-column d-flex flex-column"
        v-for="(item, index) in $props.data"
        :key="index"
      >
        <div class="v-container-box-column-title">
          {{ item.company.name }}
        </div>
        <div class="v-container-box-column-items">
          <MailsLetter
            :companyColor="item.company.color"
            :data="mail"
            :active="Number($route.query.mail) === mail.id"
            v-for="(mail, index) in item.mail"
            :key="index"
          />
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
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
