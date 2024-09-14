<template>
  <div class="form">
    <v-form class="form-default">
      <v-container class="">
        <v-row>
          <v-col :cols="12" :sm="12">
            <v-text-field
              v-model="formData.name"
              :label="'Название'"
              clearable
              :error-messages="formErrors?.name"
              :name="proxyFields.name.name"
              :readonly="loading"
            />
          </v-col>
          <v-col :cols="12" :sm="12">
            <Autocomplete
              :items="proxyFields.territories_id.items"
              :field="proxyFields.territories_id"
              v-model="formData.territories_id"
              :error-messages="formErrors?.territories_id"
              :formData="formData"
              :readonly="loading"
              ref="autocompleteRef"
              @input="
                changeAutocomplete({
                  value: formData.territories_id,
                  field: proxyFields.territories_id,
                })
              "
              :fields="proxyFields"
              :mode="mode"
              :environment="environment"
            />
          </v-col>
          <v-col v-if="isEdit === 'edit'" :cols="12" :sm="12" class="mb-3">
            <div class="cityList px-3 py-3">
              <div>
                <v-btn
                  @click="dialog = true"
                  color="#EDF5FD"
                  elevation="0"
                  block
                  :disabled="loading"
                >
                  <v-icon color="#4E9EEE">mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="overflow-auto cityList-container">
                <template v-if="formData.cities?.length">
                  <v-row
                    v-for="(item, index) in formData.cities"
                    class="text--text font-weight-500 align-center justify-space-between"
                  >
                    <span>{{ item.name }} ({{ item.regions_name }})</span>
                    <v-btn
                      :disabled="loading"
                      @click="formData.cities.splice(index, 1)"
                      icon
                    >
                      <v-icon color="error">mdi-minus-box</v-icon>
                    </v-btn>
                  </v-row>
                </template>
                <template v-else>
                  <div
                    class="height-100 d-flex justify-center align-center flex-column"
                  >
                    <v-icon class="cursor-default" color="textGray" size="60"
                      >mdi-pin-off</v-icon
                    >
                    <span class="textGray--text text-center font-weight-400"
                      >Здесь пока нет <br />
                      закреплённых объектов, <br />
                      воспользуйтесь кнопкой “<span class="primary--text"
                        >+</span
                      >”, <br />
                      чтобы добавить</span
                    >
                  </div>
                </template>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-dialog persistent v-model="dialog" width="500">
          <v-card class="py-6 px-6">
            <v-row>
              <v-col :cols="12" :sm="12">
                <Autocomplete
                  :field="proxyFields.regions_id"
                  v-model="formData.regions_id"
                  :error-messages="formErrors?.regions_id"
                  :formData="formData"
                  ref="autocompleteRef"
                  @input="
                    changeAutocomplete({
                      value: formData.regions_id,
                      field: proxyFields.regions_id,
                    })
                  "
                  :fields="proxyFields"
                  :mode="mode"
                  :environment="environment"
              /></v-col>
              <v-col :cols="12" :sm="12">
                <Autocomplete
                  :field="proxyFields.city_id"
                  v-model="formData.city_id"
                  :error-messages="formErrors?.city_id"
                  :formData="formData"
                  ref="autocompleteRef"
                  @input="
                    changeAutocomplete({
                      value: formData.city_id,
                      field: proxyFields.city_id,
                    })
                  "
                  :fields="proxyFields"
                  :mode="mode"
                  :environment="environment"
              /></v-col>
            </v-row>
            <v-row class="mb-3 ml-3 error--text" v-if="zoneCities?.length">
              <span v-for="(item, index) in zoneCities" :key="index"
                >Город {{ item.name }} закреплён за зоной:
                {{ item.zone_name }}</span
              >
            </v-row>
            <v-divider class="mb-3"></v-divider>
            <v-row class="justify-end">
              <v-btn @click="closeDialog" class="mr-1" color="text" text>
                Закрыть
              </v-btn>
              <v-btn
                :disabled="
                  !formData.city_id?.length ||
                  (formData.city_id?.length && !!zoneCities.length)
                "
                @click="setCities"
                color="primary"
              >
                Сохранить
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>

        <v-divider class="mt-0 mb-3"></v-divider>
        <v-row class="justify-end">
          <v-btn
            :type="action.type"
            :color="action.color"
            class="ml-2"
            :class="'formButton_' + action.text"
            :loading="loading"
            @click.prevent="
              clickHandler({ action, skipValidation: action.skipValidation })
            "
            v-for="action in actions"
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
