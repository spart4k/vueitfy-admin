<template>
  <div
    :class="[
      'v-letter-expanded',
      'd-flex',
      'flex-column',
      $route?.query?.mail && 'v-letter-expanded__edited',
    ]"
  >
    <div class="v-letter-expanded-user">
      <template v-if="!$route?.query?.compose">
        <v-icon class="v-letter-expanded-user_icon" small>$IconBookmark</v-icon>
        <MailsLetterUser expanded />
        <div class="v-letter-expanded-user-favorite">
          <div class="v-letter-expanded-user-favorite_icon">
            <v-icon small>$IconStarMail</v-icon>
          </div>
          <div class="v-letter-expanded-user-favorite-date">
            <div class="v-letter-expanded-user-favorite-date_day">13 фев</div>
            <div class="v-letter-expanded-user-favorite-date_time">
              13:45:30
            </div>
          </div>
        </div>
      </template>
      <MailsLetterUserEdit v-else />
    </div>
    <div class="v-letter-expanded-container">
      <MailsLetterTextEdit v-if="$route?.query?.compose" />
      <MailsLetterText
        v-if="$route?.query?.compose !== 'new'"
        :edit="!$route?.query?.compose || $route?.query?.compose === 'edit'"
      />
    </div>
    <div class="v-letter-expanded_btn pb-2 mt-4">
      <v-btn
        @click="
          $route?.query?.compose === 'new' ? createMail() : answerToMail()
        "
        color="primary"
      >
        <v-icon small class="mr-2">$IconEdit</v-icon>
        {{ $route?.query?.compose === 'new' ? 'Отправить' : 'Ответить' }}
      </v-btn>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
