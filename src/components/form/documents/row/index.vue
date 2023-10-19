<template>
  <div class="document">
    <div class="document-wrap">
      <div class="document-title text-h6">
        {{ document.name }}
      </div>
      <v-row>
        <v-col cols="12" sm="6" class="document-fields">
          <v-row>
            <v-col
              v-for="field in document.fields"
              :key="field.id"
              :cols="field.position.cols"
              :sm="field.position.sm"
              class="field-col"
              :class="field.type"
            >
              <div
                v-if="loading && field.isShow"
                class="field-loading gradient"
              >
                <!--<p>loading</p>-->
              </div>
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
                :multiple="field.subtype === 'multiselect'"
                @change="changeSelect({ value: formData[field.name], field })"
              ></v-select>
              <Autocomplete
                v-else-if="showField('autocomplete', field)"
                :field="field"
                v-model="formData[field.name]"
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
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <DropZone :options="dropZoneOptions" :formData="formData" />
          <!--<img
            src="http://10.63.1.132:5000/file/get/tmp/%D0%AF%D0%BC%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0_%D0%91%D0%A4_2023-10-11_%D0%9A%D0%B0%D0%B2%D0%B0%D0%BB%D1%8F%D1%83%D1%81%D0%BA%D0%B0%D0%B9%D1%82%D0%B5%D0%95%D0%BB%D0%B5%D0%BD%D0%B0%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_1697092059882.jpg"
            alt=""
          />-->
        </v-col>
      </v-row>

      <div class="document-file"></div>
    </div>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
