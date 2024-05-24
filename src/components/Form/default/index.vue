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
              @input="
                changeValue({
                  value: formData[field.name],
                  field,
                })
              "
              :readonly="readonlyField(field)"
              :disabled="disabledField(field)"
              :name="field.name"
              :class="[...field.class]"
            >
              <template v-if="field?.appendAction?.length" v-slot:append-outer>
                <!-- <v-icon> {{ field.appendAction.icon }} </v-icon> -->
                <v-tooltip
                  v-for="action in field.appendAction"
                  :key="action.label"
                  top
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      @click="appendFieldHandler({ action, field })"
                      class=""
                      small
                      v-if="appendActionShow(action)"
                    >
                      <v-tooltip activator="parent" location="top"
                        >Tooltip</v-tooltip
                      >
                      <v-icon> {{ action.icon }} </v-icon></v-btn
                    >
                  </template>
                  <span>{{ action.label }}</span>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-checkbox
              v-else-if="showField('checkbox', field)"
              v-model="formData[field.name]"
              :label="field.label"
              :disabled="disabledField(field)"
              :readonly="readonlyField(field)"
              :name="field.name"
              :class="'checkbox_' + field.name"
              @change="
                changeValue({
                  value: formData[field.name],
                  field,
                })
              "
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
            <v-carousel
              v-else-if="
                showField('carousel', field) && formData[field.name].length
              "
              height="300px"
              class="carousel"
              v-model="model"
            >
              <v-btn
                v-if="!readonlyField(field)"
                @click="formData[field.name].splice(model, 1)"
                class="carousel_delete"
                color="text"
                icon
                small
              >
                <v-icon small color="text">$IconDelete</v-icon></v-btn
              >
              <v-carousel-item
                v-for="(item, i) in formData[field.name]"
                :key="i"
                :src="$root.env.VUE_APP_STORE + item"
              ></v-carousel-item>
            </v-carousel>
            <v-card
              class="overflow-auto"
              outlined
              v-else-if="
                showField('docList', field) && formData[field.name].length
              "
            >
              <v-list>
                <v-list-item
                  :value="item"
                  :key="index"
                  v-for="(item, index) in formData[field.name]"
                >
                  <v-list-item-icon>
                    <v-btn icon @click="downloadFile(item)">
                      <v-icon color="text">$IconDownload</v-icon></v-btn
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn
                      v-if="!readonlyField(field)"
                      @click="formData[field.name].splice(index, 1)"
                      icon
                    >
                      <v-icon color="text">$IconDelete</v-icon></v-btn
                    >
                  </v-list-item-icon>
                  <!-- <template v-slot:append>
                    <v-btn icon> <v-icon>$IconDelete</v-icon></v-btn>
                  </template> -->
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mt-0 mb-3" v-if="tab.actions.length"></v-divider>
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
    <Popup
      closeButton
      @close="closePopupForm"
      :options="{
        width: tab?.detail.width,
        portal: `table-detail${
          tab?.detail?.popupIndex ? tab?.detail?.popupIndex : ''
        }`,
      }"
      v-if="popupForm.isShow"
    >
      <!--<Detail
        class="cols-6"
        :detail="options.detail"
        :class="[...options.detail.bootstrapClass, ...options.detail.classes]"
      />-->
      <router-view
        :detail="tab.detail"
        :class="[...tab.detail.bootstrapClass, ...tab.detail.classes]"
        @closePopup="closePopupForm"
        @getItems="getItems"
        @refreshData="getData"
        :formDataParent="formData"
      />
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
