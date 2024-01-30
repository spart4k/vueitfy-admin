<template>
  <div class="">
    <v-menu
      :key="field.id"
      :ref="`menuRef_${field.id}`"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :contentClass="edge === 'right' ? 'rightDate' : ''"
      :location="edge === 'right' ? 'top start' : ''"
      :attach="edge === 'right' ? '#attachMenu' : ''"
      :right="edge === 'right' ? true : false"
      :style="edge === 'right' ? 'right: 0' : ''"
    >
      <template v-slot:activator="{ attrs }">
        <v-text-field
          @click:append="menu = true"
          v-model="proxyValue"
          :label="label"
          :placeholder="placeholder"
          append-icon="mdi-calendar"
          v-bind="attrs"
          v-mask="'####.##.##'"
          :disabled="disabled"
          :readonly="readonly"
          :class="field.subtype === 'range' && 'mt-0 pt-0'"
          clearable
          @input="changeValue"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          :error-messages="errorMessages"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateValue"
        color="primary"
        locale="ru-RU"
        :type="field.subtype === 'period' ? 'month' : undefined"
        :multiple="field.subtype === 'multiple'"
        :readonly="readonly"
        :first-day-of-week="1"
        @input="
          field.subtype !== 'multiple' ? (menu = false) : undefined
          changeDate()
        "
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="menu = false"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped></style>
