<template>
  <div class="form">
    <v-form class="form-default">
      <v-container class="">
        <v-row>
          <v-col
            v-for="field in tab.fields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="colsField(field)"
            class="field-col"
            :class="[
              field.type,
              readonlyField(field) ? 'readonly' : '',
              typeof field.isShow === 'object' && !field.isShow.value
                ? 'isHide'
                : '',
            ]"
          >
            <div
              v-if="
                loading &&
                field.isShow &&
                ((typeof field.isShow === 'boolean' && field.isShow) ||
                  (typeof field.isShow === 'object' && field.isShow.value))
              "
              class="field-loading gradient"
            ></div>
            <!--<v-select
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
              :readonly="readonlyField(field)"
            ></v-select>-->
            <Autocomplete
              v-else-if="showField('select', field)"
              :field="field"
              v-model="formData[field.name]"
              :error-messages="formErrors[field?.name]"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
              :readonly="readonlyField(field)"
              :class="[...field.class]"
            />
            <Autocomplete
              v-else-if="showField('autocomplete', field)"
              :field="field"
              v-model="formData[field.name]"
              :error-messages="formErrors[field?.name]"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
              :readonly="readonlyField(field)"
              :class="[...field.class]"
            />

            <v-text-field
              v-else-if="showField('string', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :placeholder="field?.placeholder"
              :error-messages="formErrors[field?.name]"
              clearable
              :readonly="readonlyField(field)"
              :disabled="disabledField(field)"
            />
            <v-checkbox
              v-else-if="showField('checkbox', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :disabled="disabledField(field)"
              :readonly="readonlyField(field)"
            ></v-checkbox>
            <Datepicker
              v-else-if="showField('date', field)"
              v-model="formData[field.name]"
              :field="field"
              :label="field.label"
              :error-messages="formErrors[field?.name]"
              :disabled="disabledField(field)"
              :readonly="readonlyField(field)"
            ></Datepicker>
            <v-textarea
              v-else-if="showField('textarea', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :error-messages="formErrors[field?.name]"
              clearable
              rows="1"
              :disabled="disabledField(field)"
              :readonly="readonlyField(field)"
            />
            <Datetimepicker
              v-else-if="showField('datetime', field)"
              :label="field.label"
              v-model="formData[field.name]"
              clearable
              :error-messages="formErrors[field?.name]"
              :readonly="readonlyField(field)"
            />
            <DropZone
              v-else-if="showField('dropzone', field)"
              :options="field.options"
              v-model="formData[field.name]"
              :formData="formData"
              :disabled="disabledField(field)"
              :field="field"
              @addFiles="addFiles($event, field)"
              :error-messages="formErrors[field?.name]"
              :readonly="readonlyField(field)"
            />
            <ColorPicker
              v-else-if="showField('colorPicker', field)"
              v-model="formData[field.name]"
              :formData="formData"
              :disabled="disabledField(field)"
              :field="field"
              :error-messages="formErrors[field?.name]"
              :label="field.label"
              :readonly="readonlyField(field)"
            />
            <DateRange
              v-else-if="showField('dateRange', field)"
              v-model="formData[field.name]"
              :formData="formData"
              :disabled="disabledField(field)"
              :field="field"
              :error-messages="formErrors[field?.name]"
              :label="field.label"
              :readonly="readonlyField(field)"
            />
          </v-col>
        </v-row>
        <v-divider class="mt-0 mb-3"></v-divider>
        <v-row> xyu </v-row>
        <v-divider class="mt-3 mb-3" v-if="tab.actions.length"></v-divider>
        <v-row class="justify-end">
          <v-btn
            :type="action.type"
            :color="action.color"
            class="ml-2"
            :loading="loading"
            @click.prevent="
              clickHandler({ action, skipValidation: action.skipValidation })
            "
            v-for="action in tab.actions"
            :key="action.id"
            :text="action.action === 'closePopup' ? true : false"
            v-show="!isHideBtn(action)"
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
