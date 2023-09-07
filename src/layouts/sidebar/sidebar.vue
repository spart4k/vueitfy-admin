<template>
  <transition name="expand" mode="out-in">
    <v-card
      height="100vh"
      :class="isСollapseMenu ? 'navbar-card--collapse' : 'navbar-card'"
      tile
      color="navbar"
    >
      <v-btn class="btn-menu__mob" icon v-if="isMobile" @click="setNavmenu">
        <v-icon v-if="isOpenMenu" key="clear">$IconArrowLeft</v-icon>
      </v-btn>
      <v-list
        class="header-navbar"
        height="130px"
        z-index="$default-z"
        color="navbar"
      >
        <v-list-item>
          <v-list-item-avatar
            :class="isСollapseMenu ? 'avatar--collapse ' : 'avatar'"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title
              :class="
                !isСollapseMenu
                  ? 'text-h6 nav-fio'
                  : 'text-h6  nav-fio--collapse'
              "
            >
              <p color="text">Азаров Михаил</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-navigation-drawer permanent color="navbar">
        <v-expansion-panels multiple color="navbar">
          <v-expansion-panel
            v-for="item in dataNavbarHard"
            :key="item.id"
            color="navbar "
          >
            <template v-if="!item.disclosure">
              <router-link active-class="active" :to="item.link" exact>
                <div
                  :class="isСollapseMenu ? 'nav-link--collapse' : 'nav-link'"
                >
                  <div class="icon__navlink">
                    <v-icon>{{ item.icon }}</v-icon>
                  </div>
                  <div
                    :class="
                      isСollapseMenu
                        ? 'name__navlink--collapse'
                        : 'nav__navlink'
                    "
                  >
                    <p color="text">
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </router-link>
            </template>
            <template v-if="item.disclosure && !isСollapseMenu">
              <v-expansion-panel-header
                :class="isСollapseMenu ? 'link__btn--collapse' : 'link__btn'"
                color="navbar"
              >
                <v-icon>{{ item.icon }}</v-icon>
                <transition name="slide-fade">
                  <p
                    :class="
                      isСollapseMenu
                        ? 'name__navlink--collapse'
                        : 'nav__navlink'
                    "
                    color="text"
                  >
                    {{ item.name }}
                  </p>
                </transition>
              </v-expansion-panel-header>
            </template>
            <template v-if="item.disclosure && isСollapseMenu">
              <v-menu top :offset-x="offset">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="link__btn--collapse" v-bind="attrs" v-on="on">
                    {{ item.icon }}
                  </v-icon>
                </template>
                <v-list max-height="calc(100vh - 20px)">
                  <v-list-item v-for="link in item.navlink" :key="link.id">
                    <router-link active-class="active" :to="link.link" exact>
                      <p class="navlink__item" color="text">
                        {{ link.name }}
                      </p>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template v-if="!isСollapseMenu">
              <v-expansion-panel-content
                v-for="link in item.navlink"
                :key="link.id"
                color="navbar"
              >
                <router-link active-class="active" :to="link.link" exact>
                  <p class="navlink__item" color="text">
                    {{ link.name }}
                  </p>
                </router-link>
              </v-expansion-panel-content>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-navigation-drawer>
      <template class="d-flex">
        <v-btn
          :class="collapseNavmenu ? 'btn-menu--collapse' : 'btn-menu__collapse'"
          v-if="!isMobile"
          @click="collapseNavmenu"
          text
          elevation="0"
          color="navbar"
        >
          <v-icon v-if="!isСollapseMenu" key="onCollapse" color="text">
            $IconArrowLeft
          </v-icon>
          <v-icon
            v-if="isСollapseMenu"
            key="offCollapse"
            color="text"
            padding="0"
            width="12"
          >
            $IconOpenMenu
          </v-icon>
          <span v-if="!isСollapseMenu" class="text-collaspe__navbar">
            Свернуть
          </span>
        </v-btn>
      </template>
    </v-card>
  </transition>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>

<!-- 
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
        class="btn-menu__collapse"
        v-if="!isMobile && !collapseNavmenu"
        @click="collapseNavmenu"
      >
        <v-icon v-if="!collapseNavmenu" key="onCollapse">$IconArrowLeft</v-icon>
        <span v-if="!collapseNavmenu">Свернуть</span>
      </v-btn>
      <v-btn
        class="btn-menu__collapse"
        v-if="!isMobile && !collapseNavmenu"
        @click="collapseNavmenu"
      >
        <v-icon v-if="collapseNavmenu" key="offCollapse">$IconOpenMenu</v-icon>
      </v-btn>
    </template>
  </v-card>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>-->
