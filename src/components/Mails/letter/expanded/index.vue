<template>
  <div :class="['v-letter-expanded', 'd-flex', 'flex-column']">
    <!-- {{ edit }} -->
    <template v-if="$props.data || $route?.query?.compose">
      <div class="v-letter-expanded-user">
        <template v-if="!$route?.query?.compose">
          <v-icon
            v-if="
              $route.query.filter !== 'sent' && $route.query.filter !== 'trash'
            "
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
        <MailsLetterUserEdit
          @deleteUser="deleteUser"
          :filterData="$props.filterData"
          :data="newMessage"
          v-else
        />
      </div>
      <div class="v-letter-expanded-container">
        <MailsLetterTextEdit
          @addFiles="addFiles"
          @removeFile="removeFile"
          :data="newMessage"
          v-if="$route?.query?.compose"
        />
        <MailsLetterText
          v-if="$route?.query?.compose !== 'new' && $props?.data"
          :data="$props?.data"
          :edit="!$route?.query?.compose || $route?.query?.compose === 'answer'"
        />
      </div>
      <div
        v-if="$route.query.filter !== 'sent' && $route.query.filter !== 'trash'"
        class="v-letter-expanded_btn"
      >
        <template v-if="!loading">
          <v-btn
            @click="
              $route?.query?.compose === 'new' ||
              $route?.query?.compose === 'answer'
                ? createMail()
                : answerToMail($props.data)
            "
            color="primary"
            :disabled="!validation"
          >
            <v-icon small class="mr-2">$IconEdit</v-icon>
            {{
              $route?.query?.compose === 'new' ||
              $route?.query?.compose === 'answer'
                ? 'Отправить'
                : 'Ответить'
            }}
          </v-btn>
          <v-btn
            v-if="$route?.query?.compose !== 'new'"
            class="ml-4"
            @click="closeLetter"
            color="error"
          >
            <!-- <v-icon small class="mr-2">$IconEdit</v-icon> -->
            Закрыть
          </v-btn>
        </template>
        <v-progress-circular
          v-else
          class="ml-14 mb-1"
          indeterminate
          color="primary"
        ></v-progress-circular>
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
