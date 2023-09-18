<template>
  <div class="v-letter-expanded d-flex flex-column">
    <div class="v-letter-expanded_user">
      <MailsLetterUser v-if="false" expanded />
      <MailsLetterUserEdit v-else />
    </div>
    <div class="v-letter-expanded-container">
      <MailsLetterTextEdit />
      <MailsLetterText edit />
    </div>
    <div class="v-letter-expanded_btn pb-2 mt-4">
      <v-btn color="primary">
        <v-icon small class="mr-2">$IconEdit</v-icon>
        Ответить
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
