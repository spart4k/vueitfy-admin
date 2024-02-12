<template>
  <div class="form">
    <v-row :key="row">
      <!--{{ tab.fields }}-->
      <v-col
        v-for="field in cloneForm.fields"
        :key="field.id"
        :sm="field.position.sm"
        class="field-col"
        :class="[field.type, ...field.class]"
      >
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
          :error-messages="formErrors[field.name]"
          persistent-hint
          clearable
          :multiple="field.subtype === 'multiselect'"
          @change="changeSelect({ value: formData[field.name], field })"
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
        </v-select>
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
            min="1940-01-01"
            color="primary"
            locale="ru-RU"
            :type="field.subtype === 'period' ? 'month' : undefined"
            :range="field.subtype === 'range'"
            :multiple="field.subtype === 'multiple'"
            :first-day-of-week="1"
            @input="
              field.subtype !== 'multiple' ? (field.menu = false) : undefined
            "
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="field.menu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="field.menu = false"> OK </v-btn>
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
          <p>{{ formData[field.name] }}</p>
          <p>{{ formatedRow }}</p>
        </div>
      </v-col>
      {{ error }}
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <div
            v-show="target.error"
            class="form-tooltip"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon size="20" color="red">mdi-alert</v-icon>
          </div>
        </template>
        <span>{{ target.error }}</span>
      </v-tooltip>
    </v-row>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
