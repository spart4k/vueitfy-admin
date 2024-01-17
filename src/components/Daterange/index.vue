<template>
  <div class="">
    <v-subheader class="pl-0" style="height: unset">Label here</v-subheader>
    <v-row>
      <v-col class="pl-0" cols="12" sm="6">
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
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date.start"
            color="primary"
            locale="ru-RU"
            :readonly="readonly"
            :first-day-of-week="1"
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
        class="pr-0 d-flex align-start justify-space-between"
        cols="12"
        sm="6"
      >
        <v-menu
          :key="field.id"
          :ref="`menuRef_${field.id}`"
          v-model="dateMenu.end"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
          location="start"
          rounded
          internal-activator
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
              ></v-text-field>
              <v-icon class="mt-3 ml-2" x-small>$IconClose</v-icon>
            </template>
          </template>
          <v-date-picker
            v-model="date.end"
            color="primary"
            locale="ru-RU"
            :readonly="readonly"
            :first-day-of-week="1"
            @input="field.subtype !== 'multiple' ? closeMenu('end') : undefined"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closeMenu('end')"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
