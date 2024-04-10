<template>
  <div>
    <v-expansion-panels class="mb-5" v-if="isShow" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row align="center">
            <v-icon class="mr-2" v-if="osnConfirmed" small color="green"
              >$IconGalka</v-icon
            >
            <span>Основные данные</span>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col
              v-for="field in fieldsConfig"
              :key="field.id"
              :cols="field.position.cols"
              :sm="field.position.sm"
              class="field-col"
              :class="[
                field.type,
                typeof field.isShow === 'object' && !field.isShow.value
                  ? 'isHide'
                  : '',
              ]"
              :name="field.name"
            >
              <Autocomplete
                v-if="field.type === 'select'"
                :field="field"
                v-model="formData[field.name]"
                :error-messages="formErrors[field?.name]"
                :formData="formData"
                ref="autocompleteRef"
                @change="changeAutocomplete"
                :class="[...field.class]"
              />
              <v-text-field
                v-else-if="field.type === 'string'"
                v-model="formData[field.name]"
                :label="field.label"
                :placeholder="field?.placeholder"
                :error-messages="formErrors[field?.name]"
                clearable
                :name="field.name"
              ></v-text-field>
              <Datepicker
                v-else-if="field.type === 'date'"
                v-model="formData[field.name]"
                :field="field"
                :label="field.label"
                :error-messages="formErrors[field?.name]"
              ></Datepicker>
            </v-col>
          </v-row>
          <v-row class="justify-end">
            <v-btn
              color="warning"
              class="ml-2"
              :disabled="vForm.$invalid"
              @click.prevent="sumbitDoc"
              small
            >
              Исправлено
            </v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped></style>
