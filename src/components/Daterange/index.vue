<template>
  <div id="attachMenu" style="position: relative" class="date-range">
    <v-row class="d-flex align-start justify-space-between">
      <v-subheader
        :class="[focused && 'isFocus', hasError && 'isError']"
        class="pl-0 date-range-label"
        style="height: unset"
        >{{ field.label }}</v-subheader
      >
    </v-row>
    <v-row style="flex-wrap: nowrap" class="mt-0">
      <v-col
        style="transition: 0.2s"
        class="pl-0"
        cols="12"
        :sm="!isEmpty ? 6 : 6"
      >
        <v-menu
          :key="field.id"
          :ref="`menuRef_${field.id}`"
          v-model="dateMenu.start"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ attrs }">
            <v-text-field
              @click:append="openMenu('start')"
              v-model="date.start"
              append-icon="mdi-calendar"
              v-bind="attrs"
              placeholder="От"
              :readonly="readonly"
              class="mt-0 pt-0"
              clearable
              @focus="onFocus"
              @blur="unFocus"
              :error-messages="errorMessages.length ? errorMessages[0][0] : ''"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date.start"
            color="primary"
            locale="ru-RU"
            :readonly="readonly"
            :first-day-of-week="1"
            :max="date.end"
            @input="
              field.subtype !== 'multiple' ? closeMenu('start') : undefined
            "
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closeMenu('start')"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        style="transition: 0.2s"
        class="pr-0"
        cols="12"
        :sm="!isEmpty ? 5 : 6"
      >
        <v-menu
          :key="field.id"
          :ref="`menuRef_${field.id}`"
          v-model="dateMenu.end"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
          content-class="rightDate"
          location="top start"
          attach="#attachMenu"
          :right="true"
          style="right: 0"
        >
          <template v-slot:activator="{ attrs }">
            <template>
              <v-text-field
                @click:append="openMenu('end')"
                v-model="date.end"
                append-icon="mdi-calendar"
                v-bind="attrs"
                :readonly="readonly"
                placeholder="По"
                class="mt-0 pt-0"
                clearable
                @focus="onFocus"
                @blur="unFocus"
                :error-messages="
                  errorMessages.length ? errorMessages[0][1] : ''
                "
              ></v-text-field>
            </template>
          </template>
          <v-date-picker
            v-model="date.end"
            color="primary"
            locale="ru-RU"
            :readonly="readonly"
            :first-day-of-week="1"
            :min="date.start"
            @input="field.subtype !== 'multiple' ? closeMenu('end') : undefined"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closeMenu('end')"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col v-if="!isEmpty" class="pr-0" :sm="!isEmpty ? 1 : 0">
        <v-icon @click="resetDate" class="mt-1 mr-1" x-small>$IconClose</v-icon>
      </v-col>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
