<template>
  <div class="document">
    <div class="document-wrap">
      <div class="document-title text-h6 mb-2">
        {{ document.doc_name }}
      </div>
      <v-row class="justify-space-between">
        <v-col cols="12" sm="6" class="document-fields">
          <v-row>
            <v-col
              v-for="(field, fieldKey) in formData"
              :key="fieldKey"
              :cols="12"
              :sm="6"
              class="field-col"
              :class="field.type"
            >
              <div
                v-if="loading && field.isShow"
                class="field-loading gradient"
              >
                <!--<p>loading</p>-->
              </div>
              <v-text-field
                v-else
                v-model="formData[fieldKey]"
                :label="switchLabel(fieldKey)"
                :error-messages="formErrors[field.name]"
                clearable
                :readonly="field.readonly"
                :disabled="field.readonly"
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

        <v-col v-if="document.path_doc" cols="12" sm="5">
          <!-- {{ $root.env.VUE_APP_STORE + document.path_doc }}
          {{ pathDock }} -->
          <!-- <img :src="$root.env.VUE_APP_STORE + document.path_doc" alt="" /> -->
          <!-- <img :src="$root.env.VUE_APP_STORE + pathDock" alt="" /> -->
          <div class="document-scan">
            <div class="document-scan-preview-panel">
              <v-icon
                v-if="!isEdit"
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
              <img :src="$root.env.VUE_APP_STORE + document.path_doc" alt="" />
            </div>
            <DropZone
              v-else
              :options="{
                withoutSave: false,
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

      <div class="document-file"></div>
    </div>
    <v-divider></v-divider>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
