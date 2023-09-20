<template>
  <div class="">
    <v-menu
      :key="field.id"
      ref="menuRef"
      v-model="field.menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="value"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :error-messages="errorMessages"
        ></v-text-field>
      </template>
      <v-tabs v-model="activeTab">
        <v-tab v-for="item in tabs" :key="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-date-picker
            v-model="tabs.date.value"
            min="1950-01-01"
            color="primary"
            locale="ru-RU"
            :type="field.subtype === 'period' ? 'month' : undefined"
            :range="field.subtype === 'range'"
          ></v-date-picker>
        </v-tab-item>
        <v-tab-item>
          <v-time-picker v-model="tabs.time.value" format="ampm" />
        </v-tab-item>
      </v-tabs-items>
    </v-menu>
  </div>
</template>
<script src="./setup.js"></script>
