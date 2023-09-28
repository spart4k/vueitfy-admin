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
        <v-icon
          class="v-letter-expanded-user_icon"
          :color="$props?.data?.ismain ? 'warning' : ''"
          small
          @click="
            $parent.$emit('changeMailKey', {
              id: $props.data.id,
              ismain: $props.data.ismain,
              box_id: $props?.data?.box_id,
              key: 'ismain',
            })
          "
          >$IconBookmark</v-icon
        >
        <MailsLetterUser :data="$props.data" expanded />
        <div class="v-letter-expanded-user-favorite">
          <MailsLetterDate :data="$props.data"></MailsLetterDate>
        </div>
      </template>
      <MailsLetterUserEdit v-else />
    </div>
    <div class="v-letter-expanded-container">
      <MailsLetterTextEdit v-if="$route?.query?.compose" />
      <MailsLetterText
        :data="$props.data"
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
