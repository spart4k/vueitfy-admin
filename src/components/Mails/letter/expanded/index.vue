<template>
  <div
    :class="[
      'v-letter-expanded',
      'd-flex',
      'flex-column',
      $route.query.mail && 'v-letter-expanded__edited',
    ]"
  >
    <div class="v-letter-expanded_user">
      <MailsLetterUser v-if="!$route.query.compose" expanded />
      <MailsLetterUserEdit v-else />
    </div>
    <div class="v-letter-expanded-container">
      <MailsLetterTextEdit v-if="$route.query.compose" />
      <MailsLetterText
        :edit="!$route.query.compose || $route.query.compose === 'edit'"
      />
    </div>
    <div class="v-letter-expanded_btn pb-2 mt-4">
      <v-btn
        @click="$route.query.compose === 'new' ? createMail() : answerToMail()"
        color="primary"
      >
        <v-icon small class="mr-2">$IconEdit</v-icon>
        {{ $route.query.compose === 'new' ? 'Отправить' : 'Ответить' }}
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
