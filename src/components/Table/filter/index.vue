<template>
  <div class="v-table-filter">
    <v-form class="fluid">
      <v-row class="mb-8">
        <v-icon class="mr-2">$IconFilter</v-icon>
        <div class="text-h4">Фильтры</div>
      </v-row>
      <template v-for="filter in filtersConfig">
        <v-autocomplete
          v-if="filter.type === 'select'"
          :key="filter.id"
          clearable
          :loading="filter.loading"
          :items="filter.items"
          :search-input.sync="filter.search"
          v-model="filter.select"
          label="Поиск девайса"
          chips
          multiple
          class="mb-4"
          item-text="brand"
          item-value="brand"
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
              {{ data.item.brand }}
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
            <div :data-filter="filter.name" v-intersect="endIntersect" />
          </template>
          <!--<template v-slot:item="data">
            <template>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.title" />
                <v-list-item-subtitle v-html="data.item.price" />
              </v-list-item-content>
            </template>
          </template>-->
        </v-autocomplete>
      </template>
    </v-form>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
