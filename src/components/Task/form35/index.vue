<template>
  <div class="">
    <div style="padding: 10px">
      <div style="margin-bottom: 30px" v-if="!showNextStep">
        <v-card-title class="d-flex justify-center text-h6">
          <span class="font-weight-bold text-h6">{{ entity.name }}</span
          >&nbsp;({{ dataRojd }} г.р)
        </v-card-title>
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
        <!-- <FormTitle
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></FormTitle>
        <v-textarea
          v-model="comment"
          @input="commentError = ''"
          :error-messages="commentError"
          rows="2"
          clearable
          label="Комментарий"
          class="mb-2"
        ></v-textarea>
        <v-btn
          small
          @click="clickCheckBtn"
          color="primary"
          block
          :disabled="!isActiveBtnFirst"
          class="mb-1"
        >
          Завершить
        </v-btn>
        <v-btn small @click="$emit('closePopup')" color="blue-grey" block>
          Закрыть
        </v-btn> -->
      </div>
      <div class="form">
        <div class="flex-column">
          <p>Выберите сотрудника</p>
          <v-col cols="12" sm="12">
            <Autocomplete
              :field="fieldsTemplate.account"
              v-model="formData.account"
              :error-messages="formErrors.account"
              :formData="formData"
              ref="autocompleteRef"
              @change="changeAutocomplete"
              :readonly="readonlyField(fieldsTemplate.account)"
              :class="[...fieldsTemplate.account.class]"
            />
          </v-col>
        </div>
        <div class="flex-column">
          <p>Укажите стоимость документа</p>
          <v-row>
            <v-col cols="12" sm="5">
              <Autocomplete
                :field="fieldsTemplate.account"
                v-model="formData.rashod_vid"
                :error-messages="formErrors.rashod_vid"
                :formData="formData"
                ref="autocompleteRef"
                @change="changeAutocomplete"
                :class="[...fieldsTemplate.account.class]"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="formData.count"
                :label="fieldsTemplate.count.label"
                :placeholder="fieldsTemplate.count?.placeholder"
                :error-messages="formErrors.count"
                clearable
                :name="fieldsTemplate.count"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="formData.count"
                :label="fieldsTemplate.count.label"
                :placeholder="fieldsTemplate.count?.placeholder"
                :error-messages="formErrors.count"
                clearable
                :name="fieldsTemplate.count"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="formData.exact_name"
                :label="fieldsTemplate.exact_name.label"
                :placeholder="fieldsTemplate.exact_name?.placeholder"
                :error-messages="formErrors.exact_name"
                clearable
                :name="fieldsTemplate.exact_name"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="flex-column">
          <p>Укажите тип оплаты</p>
          <v-row>
            <v-col cols="12" sm="12">
              <Autocomplete
                :field="fieldsTemplate.type_pay"
                v-model="formData.type_pay"
                :error-messages="formErrors.type_pay"
                :formData="formData"
                ref="autocompleteRef"
                @change="changeAutocomplete"
                :class="[...fieldsTemplate.account.class]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <DropZone
                :options="fieldsTemplate.check_docs.options"
                v-model="formData.check_docs"
                :formData="formData"
                :field="fieldsTemplate.check_docs"
                @addFiles="addFiles($event, fieldsTemplate.check_docs)"
                :error-messages="formErrors.check_docs"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="w-100 d-flex justify-end mt-5">
        <v-btn color="transparent mr-3">Закрыть</v-btn>
        <v-btn :disabled="!isValid" color="primary">Завершить</v-btn>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
