<template>
  <div class="v-table-filter">
    <v-row class="mb-8 align-center">
      <v-row class="align-center">
        <v-icon class="mr-2">$IconFilter</v-icon>
        <div class="text-h4">Фильтры</div>
      </v-row>
      <v-icon @click="closeFilter">$close</v-icon>
    </v-row>
    <v-form class="fluid">
      <template v-for="filter in filtersConfig">
        <v-autocomplete
          v-if="filter.type === 'select'"
          :key="filter.id"
          clearable
          :loading="filter.loading"
          :items="filter.items"
          :search-input.sync="filter.search"
          v-model="filter.value"
          label="Поиск девайса"
          chips
          :multiple="filter.subtype === 'multiple'"
          class="mb-4"
          item-text="name"
          item-value="id"
          no-data-text="Нет объектов"
        >
          <template v-slot:append>
            <v-progress-circular
              v-if="filter.loading"
              :size="20"
              :width="2"
              color="primary"
              indeterminate
            />
          </template>
          <template v-slot:selection="data">
            <v-chip
              close
              v-bind="data.attrs"
              small
              @click:close="removeSelected(data, filter)"
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:append-item>
            <div class="fluid d-flex justify-center">
              <v-progress-circular
                v-if="filter.loading"
                :size="20"
                :width="2"
                color="primary"
                indeterminate
              />
            </div>
            <div :data-field="filter.name" v-intersect="endIntersect" />
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name" />
                <v-list-item-subtitle v-html="data.item.id" />
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <v-checkbox
          v-if="filter.type === 'checkbox'"
          :key="filter.id"
          v-model="filter.value"
          :label="filter.label"
        ></v-checkbox>
        <v-menu
          v-if="filter.type === 'date'"
          :key="filter.id"
          ref="menuRef"
          v-model="filter.menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter.value"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="filter.value"
            min="1950-01-01"
            color="primary"
            locale="ru-RU"
            :type="filter.subtype === 'period' ? 'month' : undefined"
            :range="filter.subtype === 'range'"
          ></v-date-picker>
        </v-menu>
      </template>
      <v-btn @click="saveFilter" color="primary" class="ma">
        <p>Принять</p>
      </v-btn>
    </v-form>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
