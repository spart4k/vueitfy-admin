<!-- <template>
  <v-card class="mx-auto" width="300">
    <v-list>
      <v-list-item link>
        <v-list-item-icon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.66667 15V9.67442C5.66667 9.18422 6.08453 8.78683 6.6 8.78683H9.4C9.91547 8.78683 10.3333 9.18422 10.3333 9.67442V15M7.45911 1.16424L1.39244 5.26691C1.14623 5.43341 1 5.70295 1 5.99026V13.6686C1 14.4039 1.6268 15 2.4 15H13.6C14.3732 15 15 14.4039 15 13.6686V5.99026C15 5.70295 14.8538 5.43341 14.6076 5.26691L8.54089 1.16425C8.21706 0.945252 7.78294 0.945251 7.45911 1.16424Z"
              stroke="currentColor"
              stroke-linecap="round"
            />
          </svg>
        </v-list-item-icon>

        <v-list-item-title>Главная</v-list-item-title>
      </v-list-item>
      <v-list-group :append-icon="null" class="main-nav-element" :value="true">
        <v-list-group
          sub-group
          v-for="item in dataNavbar"
          :key="item.id"
          no-action
          prepend-icon="mdi-plus"
          append-icon="mdi-plus"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="item in item.navlink" :key="item.id" link>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template> -->

<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel v-for="item in dataNavbar" :key="item.id">
      <v-expansion-panel-header>
        <v-icon>$IconAdd</v-icon>
        {{ item.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content v-for="item in item.navlink" :key="item.id">
        {{ item.name }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
