<template>
  <div class="rates-row">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div class="rates-row rates-row__title">{{ row.name }}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="item in row.items" :key="item.id" class="rates-row-wrap">
            <div class="fields">
              <v-row>
                <v-col
                  v-for="field in listFields"
                  :key="field.id"
                  :cols="field.position.cols"
                  :sm="field.position.sm"
                  class="field-col"
                  :class="field.type"
                >
                  <v-text-field
                    v-if="showField('string', field)"
                    v-model="formData[field.name]"
                    :label="field.label"
                    clearable
                    :readonly="field.readonly"
                  />
                  <v-menu
                    v-if="showField('date', field)"
                    :key="field.id"
                    :ref="`menuRef_${field.id}`"
                    v-model="field.menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ attrs }">
                      <v-text-field
                        @click:append="openMenu(field)"
                        v-model="formData[field.name]"
                        :label="field.label"
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formData[field.name]"
                      min="1950-01-01"
                      color="primary"
                      locale="ru-RU"
                      :type="field.subtype === 'period' ? 'month' : undefined"
                      :range="field.subtype === 'range'"
                      :multiple="field.subtype === 'multiple'"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="field.menu = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="field.menu = false">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-select
                    v-else-if="showField('select', field)"
                    :items="field.items"
                    :item-text="field.selectOption.text"
                    :item-value="field.selectOption.value"
                    :label="field.label"
                    v-model="formData[field.name]"
                    persistent-hint
                    clearable
                    :multiple="field.subtype === 'multiselect'"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>
          <div @click="openDialog" class="action">+</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--<div class="rates-row title">{{ info.name }}</div>
    <div class="rates-row-wrap">
      <div class="fields">
        <v-row>
          <v-col
            v-for="field in listFields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="field.position.sm"
            class="field-col"
            :class="field.type"
          >
            <v-text-field
              v-if="showField('string', field)"
              v-model="formData[field.name]"
              :label="field.label"
              clearable
              :readonly="field.readonly"
            />
            <v-menu
              v-if="showField('date', field)"
              :key="field.id"
              :ref="`menuRef_${field.id}`"
              v-model="field.menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ attrs }">
                <v-text-field
                  @click:append="openMenu(field)"
                  v-model="formData[field.name]"
                  :label="field.label"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData[field.name]"
                min="1950-01-01"
                color="primary"
                locale="ru-RU"
                :type="field.subtype === 'period' ? 'month' : undefined"
                :range="field.subtype === 'range'"
                :multiple="field.subtype === 'multiple'"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="field.menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="field.menu = false">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>
      <div @click="openDialog" class="action">+</div>
    </div>-->
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
