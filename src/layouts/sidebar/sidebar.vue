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
          <v-img
            src="https://papik.pro/uploads/posts/2022-08/thumbs/1661424622_35-papik-pro-p-stikeri-papich-png-61.png"
          ></v-img>
        </div>
        <div class="v-sidebar-container-user-info" v-if="!miniMenu">
          <div class="v-sidebar-container-user-info_name">Dasha Tsaritsa</div>
          <div class="v-sidebar-container-user-info_email">ferz'@mail.ru</div>
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
            <template v-if="!item?.child_json">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <div
                    v-on="miniMenu && on"
                    class="v-sidebar-container-link v-sidebar-container-link__default-height"
                    @click="setRouterPath(item?.link)"
                  >
                    <div class="v-sidebar-container-link_icon">
                      <v-icon
                        :color="$route?.path === item.link ? 'primary' : ''"
                        >{{ item?.icon }}</v-icon
                      >
                    </div>
                    <div
                      v-if="!miniMenu"
                      :class="[
                        'v-sidebar-container-link_name',
                        $route?.path === item.link &&
                          'v-sidebar-container-link_name__active',
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
                class="v-sidebar-container-link v-sidebar-container-link__default-height"
              >
                <div class="v-sidebar-container-link_icon">
                  <v-icon
                    :color="$route?.path === item?.link ? 'primary' : ''"
                    >{{ item?.icon }}</v-icon
                  >
                </div>
                <div
                  v-if="!miniMenu"
                  :class="[
                    'v-sidebar-container-link_name',
                    $route?.path === item.link &&
                      'v-sidebar-container-link_name__active',
                  ]"
                >
                  {{ item?.name }}
                </div>
              </v-expansion-panel-header>
              <template v-if="!miniMenu">
                <v-expansion-panel-content
                  v-for="(link, index) in JSON?.parse(item?.child_json)"
                  :key="index"
                  color="navbar"
                  :class="[
                    'v-sidebar-container-link',
                    instantNav && 'v-sidebar-container-link__instant',
                  ]"
                >
                  <div
                    @click="setRouterPath(link.link)"
                    :class="[
                      'v-sidebar-container-link_name',
                      'v-sidebar-container-link_name__shifted',
                      $route?.path === link.link &&
                        'v-sidebar-container-link_name__active',
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
                        class="v-sidebar-container-link v-sidebar-container-link__default-height"
                      >
                        <div class="v-sidebar-container-link_icon">
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
                  <v-list-item class="v-sidebar-container-link_title">
                    {{ item.name }}
                  </v-list-item>
                  <v-list-item
                    class="v-sidebar-container-link"
                    @click="setRouterPath(link.link)"
                    v-for="(link, index) in JSON?.parse(item?.child_json)"
                    :key="index"
                  >
                    <div
                      :class="[
                        'v-sidebar-container-link_name',
                        $route?.path === link.link &&
                          'v-sidebar-container-link_name__active',
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
      </div>

      <v-btn
        :class="['v-sidebar-container-btn']"
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
