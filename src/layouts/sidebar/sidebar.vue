<template>
  <transition name="expand" mode="out-in">
    <v-sheet class="v" color="navbar">
      <v-navigation-drawer
        v-model="openMenu"
        :absolute="isMobile"
        :temporary="isMobile"
        :permanent="openMenu"
        :class="['v-sidebar']"
        :mini-variant="miniMenu"
        mini-variant-width="76px"
      >
        <div class="v-sidebar-user">
          <div class="v-sidebar-user_image">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </div>
          <div class="v-sidebar-user-info" v-if="!miniMenu">
            <div class="v-sidebar-user-info_name">Dasha Tsaritsa</div>
            <div class="v-sidebar-user-info_email">carica@mail.ru</div>
          </div>
        </div>

        <v-expansion-panels multiple color="navbar">
          <v-expansion-panel
            v-for="item in dataNavbar"
            :key="item.id"
            color="navbar"
          >
            <template v-if="item?.link">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <div
                    v-on="miniMenu && on"
                    class="v-sidebar-link v-sidebar-link__default-height"
                    @click="setRouterPath(item?.link)"
                  >
                    <div class="v-sidebar-link_icon">
                      <v-icon
                        :color="$route?.path === item.link ? 'primary' : ''"
                        >{{ item?.icon }}</v-icon
                      >
                    </div>
                    <div
                      v-if="!miniMenu"
                      :class="[
                        'v-sidebar-link_name',
                        $route?.path === item.link &&
                          'v-sidebar-link_name__active',
                      ]"
                    >
                      {{ item?.name }}
                    </div>
                  </div>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
            </template>
            <template v-else-if="!miniMenu">
              <v-expansion-panel-header
                class="v-sidebar-link v-sidebar-link__default-height"
              >
                <div class="v-sidebar-link_icon">
                  <v-icon
                    :color="$route?.path === item.link ? 'primary' : ''"
                    >{{ item?.icon }}</v-icon
                  >
                </div>
                <div
                  v-if="!miniMenu"
                  :class="[
                    'v-sidebar-link_name',
                    $route?.path === item.link && 'v-sidebar-link_name__active',
                  ]"
                >
                  {{ item?.name }}
                </div>
              </v-expansion-panel-header>
              <template v-if="!miniMenu">
                <v-expansion-panel-content
                  v-for="(link, index) in item.navlink"
                  :key="index"
                  color="navbar"
                  class="v-sidebar-link"
                >
                  <div
                    @click="setRouterPath(link.link)"
                    :class="[
                      'v-sidebar-link_name',
                      'v-sidebar-link_name__shifted',
                      $route?.path === link.link &&
                        'v-sidebar-link_name__active',
                    ]"
                  >
                    {{ link.name }}
                  </div>
                </v-expansion-panel-content>
              </template>
            </template>
            <template v-else>
              <v-menu offset-x top>
                <template #activator="{ on: onMenu }">
                  <v-tooltip right>
                    <template #activator="{ on: hint }">
                      <div
                        v-on="{ ...hint, ...onMenu }"
                        class="v-sidebar-link v-sidebar-link__default-height"
                      >
                        <div class="v-sidebar-link_icon">
                          <v-icon
                            :color="$route?.path === item.link ? 'primary' : ''"
                            >{{ item?.icon }}</v-icon
                          >
                        </div>
                      </div>
                    </template>
                    <span>{{ item.name }}</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item class="v-sidebar-link_title">
                    {{ item.name }}
                  </v-list-item>
                  <v-list-item
                    class="v-sidebar-link"
                    @click="setRouterPath(link.link)"
                    v-for="(link, index) in item.navlink"
                    :key="index"
                  >
                    <div
                      :class="[
                        'v-sidebar-link_name',
                        $route?.path === link.link &&
                          'v-sidebar-link_name__active',
                      ]"
                    >
                      {{ link.name }}
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn
          :class="['v-sidebar-btn']"
          @click="isMobile ? changeMenuStatus() : changeMenuSize()"
          text
          color="navbar"
        >
          <v-icon v-if="!miniMenu" class="v-sidebar-btn_icon">
            $IconArrowLeft
          </v-icon>
          <v-icon
            v-if="miniMenu"
            class="v-sidebar-btn_icon"
            padding="0"
            width="12"
          >
            $IconOpenMenu
          </v-icon>
          <div v-if="!miniMenu" class="v-sidebar-btn_text">Свернуть</div>
        </v-btn>
      </v-navigation-drawer>
    </v-sheet>
  </transition>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
