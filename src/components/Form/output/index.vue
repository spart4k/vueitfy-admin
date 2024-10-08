<template>
  <div class="form">
    <!--<v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />-->
    <v-container class="">
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
              'text-center',
            ]"
            >{{ item.name }}</v-app-bar-title
          >
          <v-progress-linear
            class="mt-2"
            :class="stage.firstLoad && 'firstLoad'"
            color="success"
            background-color="disabled"
            rounded
            :value="item.value"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <v-row
        v-for="(item, index) in outputData"
        v-if="item.stage === stage.value"
        :key="index"
      >
        <v-col cols="12" sm="4">{{ item.text }}</v-col>
        <v-col>{{ item.value }}</v-col>
      </v-row>
      <template v-if="stage.value === 2">
        <v-app-bar-title class="current pl-3 mt-4"
          >Детализация:
        </v-app-bar-title>
        <component :is="proxyTab.lastStage" :stage="stage" />
      </template>
    </v-container>

    <template v-if="stage.value === 1 && !stage.showForm">
      <div class="pl-6 pr-6">
        <v-divider class="mb-4" />
        <v-app-bar-title class="current"
          >Ошибки:
          <span v-if="!stage.errors?.length">отсутствуют</span></v-app-bar-title
        >
        <v-list
          v-if="stage.errors?.length"
          class="overflow-auto mt-2 mb-4"
          max-height="300"
        >
          <v-list-item-title
            style="white-space: normal"
            v-for="(item, index) in stage.errors"
            :key="index"
          >
            Строка {{ item.row_id }}: {{ item.error }}
          </v-list-item-title>
        </v-list>
        <v-row class="justify-space-between">
          <v-btn color="primary" @click.prevent="getDownloadPath()">
            <v-icon small> $IconDownload </v-icon>
          </v-btn>
          <v-btn color="primary" @click.prevent="stage.showForm = true">
            <v-icon small class="mr-2"> $IconUpdate </v-icon>
            Обновить
          </v-btn>
          <div></div>
        </v-row>
        <v-divider class="mt-4" />
      </div>
    </template>

    <template v-if="!stage.value || stage.showForm">
      <v-form class="form-default">
        <v-container class="pb-0">
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
                @input="
                  changeAutocomplete({ value: formData[field.name], field })
                "
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

      <v-container v-if="stage.value === 1 && stage.showForm" class="pt-0">
        <v-row class="justify-end">
          <v-btn
            :type="action.type"
            :color="action.color"
            class="ml-2 text-decoration-underline"
            :loading="loading"
            text
            @click.prevent="buttonHandler(action)"
            v-for="(action, index) in subButtons"
            :key="index"
          >
            <v-icon v-if="action.icon" class="mr-2" small>
              {{ action.icon }}
            </v-icon>
            {{ action.text }}
          </v-btn>
        </v-row>
      </v-container>
    </template>

    <v-container class="">
      <v-row class="justify-end">
        <v-btn
          :type="action.type"
          :color="action.color"
          class="ml-2"
          :loading="loading"
          @click.prevent="buttonHandler(action)"
          v-for="action in proxyTab.stageActions[stage.value].actions"
          :key="action.id"
          v-show="!isHideBtn(action)"
        >
          {{ action.text }}
        </v-btn>
      </v-row>
    </v-container>

    <v-dialog v-model="confirm.isShow" persistent :width="confirm.width">
      <v-card>
        <v-card-title class="text-h5">{{ confirm.text }} </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row class="justify-end">
            <v-btn color="error" @click="confirm.isShow = false">
              Отмена
            </v-btn>
            <v-btn
              @click.prevent="buttonHandler(confirm.action)"
              type="submit"
              color="primary"
              class="ml-4"
            >
              ОК
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
