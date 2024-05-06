<template>
  <div class="zayavka-item mb-1">
    <v-row v-if="fields.length">
      <v-col
        v-for="field in fields"
        :key="field.id"
        :cols="field.position.cols"
        :sm="field.position.sm"
        class="field-col"
        :class="[
          field.type,
          typeof field.isShow === 'object' && !field.isShow.value
            ? 'isHide'
            : '',
          field.name === 'accept_sum' ? 'ml-auto' : '',
        ]"
        :name="field.name"
        ref="fieldsRef"
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
          v-else-if="field.type === 'select'"
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
          :readonly="true"
        ></v-select>-->
        <Autocomplete
          v-else-if="field.type === 'select'"
          :field="field"
          v-model="formData[field.name]"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
          :readonly="true"
          :class="[...field.class]"
        />
        <v-text-field
          v-else-if="field.type === 'string'"
          v-model="formData[field.name]"
          :label="field.label"
          :placeholder="field?.placeholder"
          clearable
          :readonly="field.name === 'accept_sum' ? false : true"
          :name="field.name"
          :error-messages="
            field.name === 'accept_sum' ? errorTextShow && errorText : []
          "
        >
        </v-text-field>
        <v-checkbox
          v-else-if="field.type === 'checkbox'"
          v-model="formData[field.name]"
          :label="field.label"
          :readonly="true"
          :name="field.name"
          :class="'checkbox_' + field.name"
        ></v-checkbox>
      </v-col>
    </v-row>
    <!-- <v-divider></v-divider> -->
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
