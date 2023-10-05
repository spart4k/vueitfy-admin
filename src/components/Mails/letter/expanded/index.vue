<template>
  <div :class="['v-letter-expanded', 'd-flex', 'flex-column']">
    <!-- {{ edit }} -->
    <template v-if="$props.data || $route?.query?.compose">
      <div class="v-letter-expanded-user">
        <template v-if="!$route?.query?.compose">
          <v-icon
            class="v-letter-expanded-user_icon"
            :color="$props?.data?.is_main ? 'warning' : ''"
            small
            @click="
              $parent.$emit('changeMailKey', {
                id: $props.data.id,
                is_main: $props.data.is_main,
                box_id: $props?.data?.box_id,
                key: 'is_main',
              })
            "
            >$IconBookmark</v-icon
          >
          <MailsLetterUser :data="$props.data" expanded />
          <div class="v-letter-expanded-user-favorite">
            <MailsLetterDate :data="$props.data"></MailsLetterDate>
          </div>
        </template>
        <MailsLetterUserEdit :data="newMessage" v-else />
      </div>
      <div class="v-letter-expanded-container">
        <MailsLetterTextEdit
          @deleteItem="deleteItem"
          :data="newMessage"
          v-if="$route?.query?.compose"
        />
        <MailsLetterText
          v-if="$route?.query?.compose !== 'new' && $props?.data"
          :data="$props?.data"
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
    </template>
    <template v-else>
      <div class="v-letter-expanded_progress">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
