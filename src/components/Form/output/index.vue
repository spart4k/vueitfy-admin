<template>
  <div class="form">
    <!--<v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />-->
    <v-row>
      <v-col
        class="mt-4 mb-4"
        ref="stageRef"
        v-for="(item, index) in stage.items"
        :key="index"
      >
        <v-app-bar-title
          :class="[
            'title',
            stage.value === index && 'current',
            stage.value > index && 'completed',
          ]"
          >{{ item.name }}</v-app-bar-title
        >
        <v-progress-linear
          class="mt-2"
          color="success"
          background-color="disabled"
          rounded
          :value="item.value"
        ></v-progress-linear>
      </v-col>
    </v-row>

    <v-form class="form-default">
      <v-container class="">
        <v-row>
          <v-col
            v-for="field in proxyTab.fields"
            :key="field.id"
            :cols="field.position.cols"
            :sm="field.position.sm"
            class="field-col"
            :class="
              !loading &&
              field.isShow &&
              ((typeof field.isShow === 'boolean' && field.isShow) ||
                (typeof field.isShow === 'object' && field.isShow.value)) &&
              field.class
            "
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
            <Autocomplete
              v-else-if="showField('select', field)"
              :field="field"
              v-model="formData[field.name]"
              :error-messages="formErrors[field?.name]"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
              :readonly="readonlyField(field)"
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
            />
            <v-text-field
              v-else-if="showField('string', field)"
              v-model="formData[field.name]"
              :label="field.label"
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
              @change="
                checkVector()
                changeAutocomplete({ value: formData[field.name], field })
              "
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
              ref="dropzone"
              @addFiles="addFiles($event, field)"
              :error-messages="formErrors[field?.name]"
              :class="readonlyField(field) && 'clickless'"
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
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="">
      <v-row class="justify-end">
        <v-btn
          :type="action.type"
          :color="action.color"
          class="ml-2"
          :loading="loading"
          @click.prevent="
            clickHandler({ action, skipValidation: action.skipValidation })
          "
          v-for="action in proxyTab.stages[stage.value].actions"
          :key="action.id"
          v-show="!isHideBtn(action)"
        >
          {{ action.text }}
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
