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
              :error-messages="formErrors[field?.name]"
              :disabled="disabledField(field)"
              :readonly="readonlyField(field)"
              @openMenu="openMenu"
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
            <v-row class="d-flex" v-else-if="showField('radioPanel', field)">
              <v-btn
                class="flex-grow-1"
                :text="formData[field.name] !== item.value"
                color="primary"
                v-for="item in field.items"
                :key="item.id"
                @click="
                  formData[field.name] = item.value
                  changeAutocomplete({ value: formData[field.name], field })
                "
                :disabled="readonlyField(field)"
              >
                {{ item.text }}
              </v-btn>
            </v-row>
            <v-btn
              v-else-if="showField('btn', field)"
              block
              :color="field.color"
              @click="changeBlockCount(field.increase)"
              :disabled="readonlyField(field)"
            >
              {{ field.label }}
            </v-btn>
            <v-card
              max-height="206"
              class="overflow-auto"
              outlined
              v-else-if="showField('schet', field)"
            >
              <v-list>
                <template v-if="formData[field.name]?.length">
                  <v-list-item
                    v-for="(item, index) in formData[field.name]"
                    :key="index"
                    :class="index && 'mt-4'"
                  >
                    <v-avatar
                      @click="downloadFile({ item })"
                      class="pointer"
                      tile
                      size="52"
                      v-if="imageFormat(item)"
                    >
                      <v-img :src="$root.env.VUE_APP_STORE + item.name"></v-img>
                    </v-avatar>
                    <v-btn x-large v-else @click="downloadFile({ item })" icon>
                      <v-icon small> $IconDownload </v-icon>
                    </v-btn>
                    <v-list-item-content class="d-flex ml-4">
                      <v-list-item-title>
                        {{ item.num }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-btn
                      @click="
                        editFile({ index, formItem: formData[field.name] })
                      "
                      v-if="!readonlyField(field)"
                      icon
                    >
                      <v-icon small> $IconEdit </v-icon>
                    </v-btn>
                    <v-btn
                      @click="
                        deleteFile({ index, formItem: formData[field.name] })
                      "
                      v-if="!readonlyField(field)"
                      icon
                    >
                      <v-icon small> $IconDelete </v-icon>
                    </v-btn>
                  </v-list-item>
                </template>
                <v-subheader class="justify-center" v-else
                  >Нет приложенных документов</v-subheader
                >
              </v-list>
            </v-card>
          </v-col>
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
