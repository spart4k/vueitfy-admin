<template>
  <v-card class="overflow-hidden" width="100%" height="64px">
    <v-app-bar color="white">
      <v-btn icon v-if="isMobile">
        <v-icon>$IconOpenMenu</v-icon>
      </v-btn>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-toolbar-title></v-toolbar-title>
      <v-container>
        <!-- <div>
          <v-btn class="mx-1" color="primary" @click="messages++">
            Send Message
          </v-btn>

          <v-btn class="mx-1" color="error" @click="messages = 0">
            Clear Notifications
          </v-btn>
        </div> -->

        <v-badge :content="messages" :value="messages" color="blue" overlap>
          <v-btn icon class="btn-notification">
            <v-icon>$IconNotificationBell</v-icon>
          </v-btn>
        </v-badge>
      </v-container>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            fab
            small
            class="etc-menu"
          >
            <span class="line"></span>
            <span class="line"></span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in itemSecondMenu"
            :key="item.icon"
            class="etc-menu__list-item"
          >
            <v-tooltip left open-delay="200">
              <template v-slot:activator="{ on }">
                <v-btn :color="item.color" fab small v-on="on">
                  <v-icon class="icon-menu" dark>
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
    <v-sheet>
      <v-container style="height: 60px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
