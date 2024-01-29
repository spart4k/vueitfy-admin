<template>
  <div class="">
    <v-menu
      ref="menuRef"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="value"
          :label="label"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :error-messages="errorMessages"
        ></v-text-field>
      </template>
      <v-tabs grow v-model="activeTab">
        <v-tab v-for="item in tabs" :key="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-date-picker
            v-model="tabs.date.value"
            min="1940-01-01"
            color="primary"
            locale="ru-RU"
            append-icon="mdi-calendar"
            readonly
            :first-day-of-week="1"
          ></v-date-picker>
        </v-tab-item>
        <v-tab-item>
          <v-time-picker
            ref="menuTime"
            v-model="tabs.time.value"
            format="ampm"
            readonly
            @click:minute="menuRef.save(tabs.time.value)"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-menu>
  </div>
</template>
<script src="./setup.js"></script>
