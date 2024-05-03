<template>
  <div class="document">
    <div class="document-wrap">
      <v-expansion-panels v-model="folderPanel" class="">
        <v-expansion-panel>
          <v-expansion-panel-header class="document-header">
            <v-icon
              small
              color="green"
              style="flex: 0"
              class="mr-3 mb-1"
              v-if="isCorrect"
            >
              $IconGalka
            </v-icon>
            <v-icon
              x-small
              color="red"
              style="flex: 0"
              class="mr-3 mb-1"
              v-else-if="isRejected && confirm"
              >$IconClose</v-icon
            >
            <div class="document-title text-h7 mb-2">
              {{
                document.doc_name
                  ? document.doc_name
                  : docNames[document.doc_id]
              }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="showScan && document.path_doc">
              <span>Скан:</span>
              <a download :href="$root.env.VUE_APP_STORE + document.path_doc"
                ><v-icon left small> $IconDocument </v-icon></a
              >
            </div>

            <v-row class="justify-space-between">
              <v-col
                cols="12"
                :sm="showDropzone ? 6 : 12"
                class="document-fields"
              >
                <v-row>
                  <v-col
                    v-for="(field, fieldKey) in fieldsData.length
                      ? fieldsData
                      : 10"
                    :key="fieldKey"
                    :cols="12"
                    :sm="6"
                    class="field-col"
                    :class="field.type"
                  >
                    <div v-if="loading" class="field-loading gradient">
                      <!-- <p>loading</p> -->
                    </div>
                    <v-text-field
                      v-else-if="field.type === 'string'"
                      v-model="formData[field.name]"
                      :label="field.label"
                      :error-messages="formErrors[field.name]"
                      clearable
                      :readonly="field.readonly || confirm"
                      :disabled="field.readonly"
                    />
                    <Datepicker
                      v-else-if="field.type === 'date'"
                      v-model="formData[field.name]"
                      :label="field.label"
                      :field="field"
                      :error-messages="formErrors[field?.name]"
                      :readonly="confirm"
                    ></Datepicker>
                    <v-checkbox
                      v-else-if="field.type === 'checkbox'"
                      v-model="formData[field.name]"
                      :label="field.label"
                      :readonly="confirm"
                    ></v-checkbox>
                    <Autocomplete
                      v-else-if="field.type === 'select'"
                      :field="{
                        ...field,
                      }"
                      v-model="formData[field.name]"
                      :error-messages="formErrors[field?.name]"
                      :formData="formData"
                      ref="autocompleteRef"
                      @change="changeAutocomplete"
                      :readonly="confirm"
                    />
                    <Autocomplete
                      v-else-if="field.type === 'autocomplete'"
                      :field="{
                        ...field,
                      }"
                      v-model="formData[field.name]"
                      :error-messages="formErrors[field?.name]"
                      :formData="formData"
                      ref="autocompleteRef"
                      @change="changeAutocomplete"
                      :readonly="confirm"
                    />
                    <!-- <v-textarea
                v-else-if="showField('textarea', field)"
                v-model="formData[field.name]"
                :label="field.label"
                :error-messages="formErrors[field.name]"
                clearable
                rows="1"
              /> -->
                  </v-col>
                </v-row>
              </v-col>

              <v-col v-if="showDropzone" cols="12" sm="5">
                <!-- {{ $root.env.VUE_APP_STORE + document.path_doc }}
          {{ pathDock }} -->
                <!-- <img :src="$root.env.VUE_APP_STORE + document.path_doc" alt="" /> -->
                <!-- <img :src="$root.env.VUE_APP_STORE + pathDock" alt="" /> -->
                <div class="document-scan">
                  <div class="document-scan-preview-panel">
                    <v-icon
                      v-if="!isEdit && pathDock.length"
                      @click="toEdit"
                      class="document-scan-preview-panel__icon"
                    >
                      $IconEdit
                    </v-icon>
                    <v-icon
                      v-if="isEdit"
                      @click="toPreview"
                      class="document-scan-preview-panel__icon"
                    >
                      $IconArrowCansel
                    </v-icon>
                  </div>
                  <div
                    v-if="document.path_doc && !isEdit"
                    class="document-scan-preview"
                  >
                    <a
                      target="_blank"
                      :href="$root.env.VUE_APP_STORE + pathDock[0]"
                    >
                      <img
                        :src="$root.env.VUE_APP_STORE + pathDock[0]"
                        alt=""
                      />
                    </a>
                  </div>
                  <DropZone
                    v-else
                    :options="{
                      maxFiles: 1,
                      removeble: true,
                      withoutSave: false,
                      folder: 'personal_doc',
                      name: '`personal_doc`',
                    }"
                    @addFiles="addFiles($event, field)"
                    :error-messages="formErrors[field?.name]"
                  />
                </div>
                <!--<img
            src="http://10.63.1.132:5000/file/get/tmp/%D0%AF%D0%BC%D1%89%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0_%D0%91%D0%A4_2023-10-11_%D0%9A%D0%B0%D0%B2%D0%B0%D0%BB%D1%8F%D1%83%D1%81%D0%BA%D0%B0%D0%B9%D1%82%D0%B5%D0%95%D0%BB%D0%B5%D0%BD%D0%B0%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B5%D0%B2%D0%BD%D0%B0_1697092059882.jpg"
            alt=""
          />-->
              </v-col>
            </v-row>
            <v-row v-if="acceptDocPanel" justify="end">
              <v-btn
                :disabled="false"
                @click="sendBankCard"
                color="primary"
                small
              >
                <!-- <v-icon left> $IconMain </v-icon> -->
                Завершить
              </v-btn>
            </v-row>
            <v-row v-if="correct" justify="end">
              <v-btn
                :disabled="vForm.$invalid"
                @click="confirmCorrect"
                :name="`${docNames[document.doc_id]}_correct_btn`"
                color="primary"
                small
              >
                <!-- <v-icon left> $IconMain </v-icon> -->
                Исправлено
              </v-btn>
            </v-row>
            <v-row v-if="confirm" justify="end">
              <v-btn
                :name="`${docNames[document.doc_id]}_reject_btn`"
                @click="rejectDoc"
                color="error"
                small
              >
                <!-- <v-icon left> $IconMain </v-icon> -->
                Отклонить
              </v-btn>
              <v-btn
                :name="`${docNames[document.doc_id]}_accept_btn`"
                @click="confirmDoc"
                color="primary"
                small
                class="ml-2"
              >
                <!-- <v-icon left> $IconMain </v-icon> -->
                Подтвердить
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="document-file"></div>
    </div>
    <v-divider></v-divider>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
