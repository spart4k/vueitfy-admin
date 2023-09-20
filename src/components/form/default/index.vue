<template>
  <div class="form">
    <v-form>
      <v-container class="">
        <v-row>
          <v-col
            v-for="field in tab.fields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="field.position.sm"
          >
            <v-text-field
              v-if="field.type === 'string'"
              v-model="field.value"
              :label="field.label"
              clearable
            />
            <v-select
              v-if="field.type === 'select' && field.selectOption"
              :items="field.items"
              :item-text="field.selectOption.text"
              :item-value="field.selectOption.value"
              label="Standard"
              v-model="field.value"
              return-object
              persistent-hint
            ></v-select>
            <v-autocomplete
              v-if="field.type === 'autocomplete'"
              :key="field.id"
              clearable
              :loading="field.loading"
              :items="field.items"
              :search-input.sync="field.search"
              v-model="field.value"
              label="Поиск девайса"
              chips
              :multiple="field.subtype === 'multiple'"
              class="mb-4"
              item-text="name"
              item-value="id"
              no-data-text="Нет объектов"
            >
              <template v-slot:append>
                <v-progress-circular
                  v-if="field.loading"
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
                  @click:close="removeSelected(data, field)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:append-item>
                <div class="fluid d-flex justify-center">
                  <v-progress-circular
                    v-if="field.loading"
                    :size="20"
                    :width="2"
                    color="primary"
                    indeterminate
                  />
                </div>
                <div :data-field="field.name" v-intersect="endIntersect" />
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
            <v-menu
              v-if="field.type === 'date'"
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
                  v-model="field.value"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="field.value"
                min="1950-01-01"
                color="primary"
                locale="ru-RU"
                type="datetime-local"
                :range="field.subtype === 'range'"
              ></v-date-picker>
            </v-menu>
            <v-textarea
              v-if="field.type === 'textarea'"
              v-model="field.value"
              :label="field.label"
              clearable
              rows="1"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-btn type="submit" color="primary" class="ml-auto">Submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
