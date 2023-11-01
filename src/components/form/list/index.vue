<template>
  <div class="form">
    <div class="form-row">
      <v-form>
        <v-container>
          <Row
            v-for="row in tab.formData.date_target"
            :tab="tab"
            :tabs="tabs"
            :key="row"
            :row="row"
            :formData="formData"
            :formErrors="formErrors"
            :loading="loading"
          >
            <!--<v-col
              v-for="field in tab.fields"
              :key="field.id"
              :sm="field.position.sm"
              class="field-col"
              :class="field.type"
            >
              <div
                v-if="loading && field.isShow"
                class="field-loading gradient"
              >
              </div>
              <v-select
                v-else-if="showField('select', field)"
                :items="field.items"
                :item-text="field.selectOption.text"
                :item-value="field.selectOption.value"
                :label="field.label"
                v-model="formData[row + '/' + field.name]"
                :error-messages="formErrors[row + '_' + field.name]"
                persistent-hint
                clearable
                :multiple="field.subtype === 'multiselect'"
                @change="changeSelect({ value: formData[field.name], field })"
              ></v-select>
              <Autocomplete
                v-else-if="showField('autocomplete', field)"
                :field="field"
                v-model="formData[row + '/' + field.name]"
                :error-messages="formErrors[field.name]"
                :formData="formData"
                ref="autocompleteRef"
                @change="changeAutocomplete"
              />
              <v-text-field
                v-else-if="showField('string', field)"
                v-model="formData[field.name]"
                :label="field.label"
                :error-messages="formErrors[field.name]"
                clearable
                :readonly="field.readonly"
                :disabled="field.readonly"
              />
              <v-checkbox
                v-else-if="showField('checkbox', field)"
                v-model="formData[field.name]"
                :label="field.label"
              ></v-checkbox>
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
                <template v-slot:activator="{ attrs }">
                  <v-text-field
                    @click:append="openMenu(field)"
                    v-model="formData[field.name]"
                    :label="field.label"
                    append-icon="mdi-calendar"
                    :error-messages="formErrors[field.name]"
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
                  @input="
                    field.subtype !== 'multiple'
                      ? (field.menu = false)
                      : undefined
                  "
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
              <DropZone
                v-else-if="showField('dropzone', field)"
                :options="field.options"
                v-model="formData[field.name]"
                :formData="formData"
              />
              <div v-else-if="showField('textBlock', field)">
                <p>{{ formData[row + '/' + field.name] }}</p>
                <p>{{ row }}</p>
              </div>
            </v-col>-->
          </Row>
          <v-row class="justify-end">
            <v-btn
              type="submit"
              :color="action.color"
              class="ml-2"
              :loading="loading"
              @click.prevent="clickHandler(action)"
              v-for="action in tab.actions"
              :key="action.id"
            >
              {{ action.text }}
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
