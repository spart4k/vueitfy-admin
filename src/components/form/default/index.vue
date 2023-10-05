<template>
  <div class="form">
    <!--<v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />-->
    <v-form>
      <v-container class="">
        <v-row>
          <v-col
            v-for="field in tab.fields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="field.position.sm"
            class="field-col"
          >
            <div v-if="loading && field.isShow" class="field-loading gradient">
              <!--<p>loading</p>-->
            </div>
            <v-text-field
              v-else-if="showField('string', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :error-messages="formErrors[field.name]"
              clearable
              :readonly="field.readonly"
              :disabled="field.readonly"
            />
            <v-select
              v-else-if="showField('select', field)"
              :items="field.items"
              :item-text="field.selectOption.text"
              :item-value="field.selectOption.value"
              :label="field.label"
              v-model="formData[field.name]"
              :error-messages="formErrors[field.name]"
              persistent-hint
              clearable
              @change="changeSelect({ value: formData[field.name], field })"
            ></v-select>
            <!--<v-autocomplete
              v-else-if="showField('autocomplete', field)"
              :key="field.id"
              clearable
              v-model="formData[field.name]"
              :loading="field.loading"
              :items="field.items"
              :search-input.sync="field.search"
              :error-messages="formErrors[field.name]"
              :label="field.label"
              chips
              :multiple="field.subtype === 'multiple'"
              class="mb-4"
              :item-text="field.selectOption.text"
              :item-value="field.selectOption.value"
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
            </v-autocomplete>-->
            <Autocomplete
              v-else-if="showField('autocomplete', field)"
              :field="field"
              v-model="formData[field.name]"
              :error-messages="formErrors[field.name]"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
            />
            <v-menu
              v-else-if="showField('date', field)"
              :key="field.id"
              :ref="`menuRef_${field.id}`"
              v-model="field.menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  @click:append="openMenu(field)"
                  v-model="formData[field.name]"
                  :label="field.label"
                  append-icon="mdi-calendar"
                  :error-messages="formErrors[field.name]"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData[field.name]"
                min="1950-01-01"
                color="primary"
                locale="ru-RU"
                :type="field.subtype === 'period' ? 'month' : undefined"
                :range="field.subtype === 'range'"
                @input="field.menu = false"
              ></v-date-picker>
            </v-menu>
            <v-textarea
              v-else-if="showField('textarea', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :error-messages="formErrors[field.name]"
              clearable
              rows="1"
            />
            <Datetimepicker
              v-else-if="showField('datetime', field)"
              :label="field.label"
              v-model="formData[field.name]"
              clearable
              :error-messages="formErrors[field.name]"
            />
            <p>
              <!--{{ field.items }}-->
              <!--{{ allLoaded }}-->
              <!--{{ field.selectOption.text + field.selectOption.value }}-->
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            type="submit"
            color="primary"
            class="ml-auto"
            :loading="loading"
            @click.prevent="submit"
          >
            Submit
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
