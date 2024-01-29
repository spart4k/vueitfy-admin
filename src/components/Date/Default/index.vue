<template>
  <div class="">
    <v-menu
      :ref="`menuRef_${field.id}`"
      v-model="field.menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ attrs }">
        <v-text-field
          @click:append="$emit('openMenu', field)"
          v-model="proxyValue"
          :label="field.label"
          append-icon="mdi-calendar"
          :error-messages="errorMessages"
          v-mask="'####.##.##'"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          @input="changeValue"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateValue"
        color="primary"
        locale="ru-RU"
        :type="field.subtype === 'period' ? 'month' : undefined"
        :range="field.subtype === 'range'"
        :multiple="field.subtype === 'multiple'"
        :readonly="readonly"
        :first-day-of-week="1"
        @input="
          field.subtype !== 'multiple' ? (field.menu = false) : undefined
          changeDate()
        "
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="field.menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="field.menu = false"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped></style>
