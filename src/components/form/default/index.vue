<template>
  <div class="form">
    <!--<v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />-->
    <v-form class="form-default">
      <v-container class="">
        <v-row>
          <v-col
            v-for="field in tab.fields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="field.position.sm"
            class="field-col"
            :class="field.type"
          >
            <!-- {{ formErrors[field?.name] }} -->
            <div v-if="loading && field.isShow" class="field-loading gradient">
              <!--<p>loading</p>-->
            </div>
            <v-select
              v-else-if="showField('select', field)"
              :items="field.items"
              :item-text="field.selectOption.text"
              :item-value="field.selectOption.value"
              :label="field.label"
              v-model="formData[field.name]"
              :error-messages="formErrors[field?.name]"
              persistent-hint
              clearable
              :multiple="field.subtype === 'multiselect'"
              @change="changeSelect({ value: formData[field.name], field })"
              :disabled="disabledField(field)"
            ></v-select>
            <Autocomplete
              v-else-if="showField('autocomplete', field)"
              :field="field"
              v-model="formData[field.name]"
              :error-messages="formErrors[field?.name]"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
            />
            <v-text-field
              v-else-if="showField('string', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :error-messages="formErrors[field?.name]"
              clearable
              :readonly="field.readonly"
              :disabled="disabledField(field)"
            />
            <v-checkbox
              v-else-if="showField('checkbox', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :disabled="disabledField(field)"
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
                  :error-messages="formErrors[field?.name]"
                  v-bind="attrs"
                  :disabled="disabledField(field)"
                ></v-text-field>
                <!--<v-combobox
                  @click:append="openMenu(field)"
                  v-model="formData[field.name]"
                  :label="field.label"
                  multiple
                  chips
                  small-chips
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                ></v-combobox>-->
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
              :error-messages="formErrors[field?.name]"
              clearable
              rows="1"
              :disabled="disabledField(field)"
            />
            <Datetimepicker
              v-else-if="showField('datetime', field)"
              :label="field.label"
              v-model="formData[field.name]"
              clearable
              :error-messages="formErrors[field?.name]"
            />
            <DropZone
              v-else-if="showField('dropzone', field)"
              :options="field.options"
              v-model="formData[field.name]"
              :formData="formData"
              :disabled="disabledField(field)"
              :field="field"
              @addFiles="addFiles($event, field)"
            />
          </v-col>
        </v-row>
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
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
