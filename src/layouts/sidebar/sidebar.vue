<template>
  <v-card width="256" height="100vh" tile>
    <v-list class="header-navbar" height="130px">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6 nav-fio">
            Азаров Михаил
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-navigation-drawer permanent>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="item in dataNavbar" :key="item.id">
          <v-expansion-panel-header>
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="item in item.navlink"
            :key="item.id"
          >
            <router-link :to="item.link">
              {{ item.name }}
            </router-link>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-card>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
