<template>
  <div class="v-sidebar" v-if="openMenu">
    <v-navigation-drawer
      v-model="isMobile"
      :absolute="isMobile"
      :temporary="isMobile"
      :permanent="openMenu"
      :class="['v-sidebar-container']"
      :mini-variant="miniMenu"
      :touchless="true"
      mini-variant-width="76px"
    >
      <div class="v-sidebar-container-user">
        <div class="v-sidebar-container-user_image">
          <!-- <v-img
            src="https://media.tenor.com/Q-gxepiJHagAAAAM/nono.gif"
          ></v-img> -->
          <v-avatar>
            <v-icon x-large> mdi-account-circle </v-icon>
          </v-avatar>
        </div>
        <div class="v-sidebar-container-user-info" v-if="!miniMenu">
          <div class="v-sidebar-container-user-info_name">
            {{ userInfo.name }}
          </div>
          <div class="v-sidebar-container-user-info_email">
            {{ userInfo.email }}
          </div>
          <!-- {{ openMenu }}{{ miniMenu }} -->
        </div>
      </div>

      <!-- {{ $props?.navData }} -->
      <div class="flex-grow-1 overflow-auto">
        <v-expansion-panels
          v-model="navbarCurrentRoute"
          v-if="$props?.navData"
          multiple
          color="navbar"
        >
          <v-expansion-panel
            v-for="item in $props?.navData"
            :key="item.id"
            color="navbar"
          >
            <template v-if="!item?.child">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <router-link
                    v-on="miniMenu && !isMobileDevice && on"
                    class="v-sidebar-container-link v-sidebar-container-link__default-height"
                    :class="
                      !isMobileDevice && 'v-sidebar-container-link__hover'
                    "
                    :to="item?.link"
                  >
                    <div class="v-sidebar-container-link_icon">
                      <v-icon
                        :color="
                          $route?.matched?.[0]?.path === item.link ||
                          item?.child?.some(
                            (e) => $route?.matched?.[0]?.path === e.link
                          )
                            ? 'primary'
                            : ''
                        "
                        >{{ item?.icon }}</v-icon
                      >
                    </div>
                    <div
                      v-if="!miniMenu"
                      :class="[
                        'v-sidebar-container-link_name',
                        $route?.matched?.[0]?.path === item.link &&
                          'v-sidebar-container-link_name__active',
                      ]"
                    >
                      {{ item?.name }}
                    </div>
                  </router-link>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
            </template>

            <template v-else-if="!miniMenu">
              <v-expansion-panel-header
                class="v-sidebar-container-link v-sidebar-container-link__default-height"
                :class="!isMobileDevice && 'v-sidebar-container-link__hover'"
              >
                <div class="v-sidebar-container-link_icon">
                  <v-icon
                    :color="
                      $route?.path === item?.link ||
                      item?.child.some(
                        (e) => $route?.matched?.[0]?.path === e.link
                      )
                        ? 'primary'
                        : ''
                    "
                    >{{ item?.icon }}</v-icon
                  >
                </div>
                <div
                  v-if="!miniMenu"
                  :class="[
                    'v-sidebar-container-link_name',
                    ($route?.matched?.[0]?.path === item.link ||
                      item?.child.some(
                        (e) => $route?.matched?.[0]?.path === e.link
                      )) &&
                      'v-sidebar-container-link_name__active',
                  ]"
                >
                  {{ item?.name }}
                </div>
              </v-expansion-panel-header>
              <template v-if="!miniMenu">
                <v-expansion-panel-content
                  v-for="(link, index) in item?.child"
                  :key="index"
                  color="navbar"
                  :class="[
                    'v-sidebar-container-link',
                    instantNav && 'v-sidebar-container-link__instant',
                    !isMobileDevice && 'v-sidebar-container-link__hover',
                  ]"
                >
                  <router-link
                    class="text-decoration-none pl-6 pr-6 pb-4 d-block"
                    :to="link.link"
                  >
                    <div
                      :class="[
                        'v-sidebar-container-link_name',
                        'v-sidebar-container-link_name__shifted',
                        $route?.matched?.[0]?.path === link.link &&
                          'v-sidebar-container-link_name__active',
                      ]"
                    >
                      {{ link.name }}
                    </div>
                  </router-link>
                </v-expansion-panel-content>
              </template>
            </template>

            <template v-else>
              <v-menu offset-x top>
                <template #activator="{ on: onMenu }">
                  <v-tooltip right :open-on-hover="!isMobileDevice">
                    <template #activator="{ on: hint }">
                      <div
                        v-on="{ ...hint, ...onMenu }"
                        class="v-sidebar-container-link v-sidebar-container-link__default-height"
                        :class="
                          !isMobileDevice && 'v-sidebar-container-link__hover'
                        "
                      >
                        <div class="v-sidebar-container-link_icon">
                          <v-icon
                            :color="
                              $route?.matched?.[0]?.path === item.link ||
                              item?.child.some(
                                (e) => $route?.matched?.[0]?.path === e.link
                              )
                                ? 'primary'
                                : ''
                            "
                            >{{ item?.icon }}</v-icon
                          >
                        </div>
                      </div>
                    </template>
                    <span>{{ item.name }}</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item class="v-sidebar-container-link_title">
                    {{ item.name }}
                  </v-list-item>
                  <v-list-item
                    v-for="(link, index) in item?.child"
                    class="pl-0 pr-0"
                    :key="index"
                  >
                    <router-link
                      :to="link.link"
                      class="v-sidebar-container-link"
                      style="height: 100%; width: 100%"
                      :class="
                        !isMobileDevice && 'v-sidebar-container-link__hover'
                      "
                    >
                      <div
                        :class="[
                          'v-sidebar-container-link_name',
                          $route?.matched?.[0]?.path === link.link &&
                            'v-sidebar-container-link_name__active',
                        ]"
                      >
                        {{ link.name }}
                      </div>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <v-btn
        :class="[
          'v-sidebar-container-btn',
          !isMobileDevice && 'v-sidebar-container-btn__hover',
        ]"
        @click="isMobile ? changeMenuStatus() : changeMenuSize()"
        text
        color="navbar"
      >
        <v-icon v-if="!miniMenu" class="v-sidebar-container-btn_icon">
          $IconArrowLeft
        </v-icon>
        <v-icon
          v-if="miniMenu"
          class="v-sidebar-container-btn_icon"
          padding="0"
          width="12"
        >
          $IconOpenMenu
        </v-icon>
        <div v-if="!miniMenu" class="v-sidebar-container-btn_text">
          Свернуть
        </div>
      </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
