<template>
  <div class="trigger-container">
    <div
      @scroll="triggerCheck"
      ref="container"
      :class="['v-container', $route?.query?.mail && 'v-container__active']"
    >
      <div
        :class="[
          'v-container-box',
          $route?.query?.mail && 'v-container-box__active',
        ]"
        @scroll="$route?.query?.mail && triggerCheck()"
        ref="containerBox"
        v-if="$route?.query?.compose !== 'new'"
      >
        <template
          v-if="
            $route?.query?.filter !== 'folder' &&
            $route?.query?.filter !== 'box'
          "
        >
          <div v-if="trigger.left" class="trigger trigger__left">
            <v-btn @click="scrollContainer(-350)" fab small color="primary">
              <v-icon small color="disabled"> $IconArrowLeft </v-icon>
            </v-btn>
          </div>
          <div
            v-if="trigger.right"
            :class="[
              'trigger',
              $route.query.mail ? 'trigger__center' : 'trigger__right',
            ]"
          >
            <v-btn @click="scrollContainer(350)" fab small color="primary">
              <v-icon small color="disabled"> $IconArrowRight </v-icon>
            </v-btn>
          </div>
        </template>
        <div
          :class="[
            'v-container-box-column',
            'd-flex',
            'flex-column',
            ($route?.query?.filter === 'folder' ||
              $route?.query?.filter === 'box') &&
              'v-container-box-column__horizontal',
          ]"
          v-for="(item, index) in $props.data"
          :key="item?.id"
          ref="upperItems"
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
            {{ item.name }}
          </div>
          <div class="v-container-box-column-items">
            <template v-if="item?.mails?.rows && !item?.mails?.rows?.length">
              <div class="v-container-box-column-items_stub">
                <p>Нет писем</p>
              </div>
            </template>
            <template v-else-if="item?.mails?.rows?.length">
              <MailsLetter
                :data="mail"
                :active="Number($route.query.mail) === mail?.id"
                v-for="(mail, mailIndex) in item?.mails?.rows"
                :key="mailIndex"
                :tagsData="$props.tagsData"
                :selectedMails="selectedMails"
                @setRouterPath="
                  (add, remove, set) => $emit('setRouterPath', add, remove, set)
                "
                @setActiveMail="
                  ($emit) => setActiveMail($emit, index, mailIndex)
                "
                @getMails="$emit('getMails')"
                ref="lowerItems"
                v-intersect="getPagination"
              />
            </template>
            <template v-else>
              <div class="v-container-box-column-items_stub">
                <p>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div
        v-if="$route.query.mail || $route.query.compose === 'new'"
        :class="[
          'v-container-expanded',
          $route.query.compose === 'new' && 'v-container-expanded__new',
          $route?.query?.mail && 'v-container-expanded__edited',
        ]"
      >
        <MailsLetterExpanded
          @setRouterPath="
            (add, remove, set) => $emit('setRouterPath', add, remove, set)
          "
          @getMails="$emit('getMails')"
          :data="activeMail"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
