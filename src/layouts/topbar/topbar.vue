<template>
  <v-app-bar class="v-topbar" color="topbar" dense>
    <v-btn @click="setNavmenu" icon v-if="isMobile">
      <v-icon color="text"> $IconOpenMenu </v-icon>
    </v-btn>

    <div v-if="!isMobile" class="v-topbar_title">{{ pageName }}</div>

    <v-badge
      offset-x="22"
      offset-y="22"
      :content="messages"
      :value="messages"
      color="error"
      overlap
    >
      <v-btn @click="showNotification" icon>
        <v-icon color="text">$IconNotificationBell</v-icon>
      </v-btn>
    </v-badge>

    <v-menu offset-y nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-on="on"
          v-bind="attrs"
          fab
          small
          class="v-topbar-menu"
        >
          <span class="line"></span>
          <span class="line"></span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item style="width: 72px" class="v-topbar-menu__list-item">
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
            persistent-hint
          ></v-switch>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in itemSecondMenu"
          :key="index"
          class="v-topbar-menu__list-item"
        >
          <v-tooltip left>
            <template #activator="{ on: tooltip }">
              <v-btn
                @click="item.action"
                :color="item.color"
                fab
                small
                v-on="!isMobile && tooltip"
              >
                <v-icon color="navbar">
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{ item.tooltip }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
