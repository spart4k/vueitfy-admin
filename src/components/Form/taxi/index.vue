<template>
  <div class="form">
    <v-form class="form-default">
      <v-container class="">
        <v-row>
          <div class="flex-column">
            <p>Выберите сотрудника</p>
            <v-col cols="12" sm="12">
              <!-- <Autocomplete
                :field="fieldsTemplate.account"
                v-model="formData.account"
                :error-messages="formErrors.account"
                :formData="formData"
                ref="autocompleteRef"
                @change="changeAutocomplete"
                :readonly="readonlyField(fieldsTemplate.account)"
                :class="[...fieldsTemplate.account.class]"
              /> -->
            </v-col>
          </div>
          <div class="flex-column">
            <p>Укажите стоимость документа</p>
            <v-row>
              <v-col cols="12" sm="5">
                <!-- <Autocomplete
                  :field="fieldsTemplate.account"
                  v-model="formData.rashod_vid"
                  :error-messages="formErrors.rashod_vid"
                  :formData="formData"
                  ref="autocompleteRef"
                  @change="changeAutocomplete"
                  :class="[...fieldsTemplate.account.class]"
                /> -->
              </v-col>
              <v-col cols="12" sm="3">
                <!-- <v-text-field
                  v-model="formData.count"
                  :label="fieldsTemplate.count.label"
                  :placeholder="fieldsTemplate.count?.placeholder"
                  :error-messages="formErrors.count"
                  clearable
                  :name="fieldsTemplate.count"
                ></v-text-field> -->
              </v-col>
              <v-col cols="12" sm="4">
                <!-- <v-text-field
                  v-model="formData.count"
                  :label="fieldsTemplate.count.label"
                  :placeholder="fieldsTemplate.count?.placeholder"
                  :error-messages="formErrors.count"
                  clearable
                  :name="fieldsTemplate.count"
                ></v-text-field> -->
              </v-col>
              <v-col cols="12" sm="12">
                <!-- <v-text-field
                  v-model="formData.exact_name"
                  :label="fieldsTemplate.exact_name.label"
                  :placeholder="fieldsTemplate.exact_name?.placeholder"
                  :error-messages="formErrors.exact_name"
                  clearable
                  :name="fieldsTemplate.exact_name"
                ></v-text-field> -->
              </v-col>
            </v-row>
          </div>
          <div class="flex-column">
            <p>Укажите тип оплаты</p>
            <v-row>
              <v-col cols="12" sm="12">
                <!-- <Autocomplete
                  :field="fieldsTemplate.type_pay"
                  v-model="formData.type_pay"
                  :error-messages="formErrors.type_pay"
                  :formData="formData"
                  ref="autocompleteRef"
                  @change="changeAutocomplete"
                  :class="[...fieldsTemplate.account.class]"
                /> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <!-- <DropZone
                  :options="fieldsTemplate.check_docs.options"
                  v-model="formData.check_docs"
                  :formData="formData"
                  :field="fieldsTemplate.check_docs"
                  @addFiles="addFiles($event, fieldsTemplate.check_docs)"
                  :error-messages="formErrors.check_docs"
                /> -->
              </v-col>
            </v-row>
          </div>
        </v-row>
        <v-row class="justify-end">
          <v-btn
            type="submit"
            :color="action.color"
            class="ml-2"
            :loading="loading"
            @click.prevent="
              clickHandler({ action, skipValidation: action.skipValidation })
            "
            v-for="action in proxyTab.actions"
            :key="action.id"
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
