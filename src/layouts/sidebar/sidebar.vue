<template>
  <v-card width="256" height="100vh" class="navbar-card" tile>
    <v-btn class="btn-menu__mob" icon v-if="isMobile" @click="setNavmenu">
      <v-icon v-if="setNavmenu" key="clear">$IconArrowLeft</v-icon>
    </v-btn>
    <v-list class="header-navbar" height="130px" z-index="$default-z">
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
        <v-expansion-panel v-for="(item, value) in navLinks" :key="value">
          <template v-if="!item.child_json">
            <router-link active-class="active" :to="item.link" exact>
              <div class="nav-link">
                <div class="icon__navlink">
                  <v-icon>{{ item.icon }}</v-icon>
                </div>
                <div class="name__navlink">
                  {{ item.name }}
                </div>
              </div>
            </router-link>
          </template>
          <template v-if="item.child_json">
            <v-expansion-panel-header>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-expansion-panel-header>
          </template>
          <v-expansion-panel-content
            v-for="link in item.child_json"
            :key="link.id"
          >
            <router-link active-class="active" :to="link.link" exact>
              <p class="navlink__item">
                {{ link.name }}
              </p>
            </router-link>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <template class="d-flex">
      <v-btn
        class="btn-menu__mob"
        v-if="!isMobile && collapseNavmenu"
        @click="collapseNavmenu"
      >
        <v-icon v-if="collapseNavmenu" key="clear">$IconArrowRight</v-icon>
        <span>Свернуть</span>
      </v-btn>
    </template>
  </v-card>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
