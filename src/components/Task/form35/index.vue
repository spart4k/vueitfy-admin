<template>
  <div class="">
    <div style="padding: 10px">
      <div class="mb-3" v-if="!showNextStep">
        <v-col class="" cols="12" sm="12">
          <PersTitle
            :data="{
              surname: data.data.personal.surname,
              name_n: data.data.personal.name_n,
              patronymic: data.data.personal.patronymic,
              dataRojd,
            }"
          />

          <TextInfo class="mb-2" :infoObj="textInfo"></TextInfo>
        </v-col>
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
          <v-col class="" cols="12" sm="12">
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
            <Autocomplete
              :field="fieldsTemplate.object_id"
              :readonly="fieldsTemplate.object_id.readonly"
              v-model="formData.object_id"
              :error-messages="formErrors.object_id"
            />
          </v-col>
          <v-row>
            <v-col class="" cols="12" sm="6">
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
              <Autocomplete
                :field="fieldsTemplate.regions_id"
                v-model="formData.regions_id"
                @change="changeAutocomplete"
                :error-messages="formErrors.regions_id"
              />
            </v-col>
            <v-col class="" cols="12" sm="6">
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
              <Autocomplete
                :field="fieldsTemplate.city_id"
                v-model="formData.city_id"
                @change="changeAutocomplete"
                :readonly="readonlyField(fieldsTemplate.city_id)"
                :disabled="disabledField(fieldsTemplate.city_id)"
                :formData="formData"
                :error-messages="formErrors.city_id"
              />
            </v-col>
          </v-row>
          <div class="mb-3 flex-column">
            <v-col class="" cols="12" sm="12">
              <p class="font-weight-bold">Укажите стоимость документа</p>
            </v-col>
            <v-col class="" cols="12" sm="12">
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
              <Autocomplete
                :field="fieldsTemplate.account_id"
                v-model="formData.account_id"
                @change="changeAutocomplete"
                :error-messages="formErrors.account_id"
              />
            </v-col>
          </div>
          <v-row> </v-row>
        </div>
        <div class="mb-3 flex-column">
          <v-col class="" cols="12" sm="12">
            <p class="font-weight-bold">Укажите стоимость документа</p>
          </v-col>
          <!-- <v-row>
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
          </v-row> -->
          <v-row class="mt-0">
            <v-col cols="6">
              <Autocomplete
                :field="fieldsTemplate.rashod_vid"
                v-model="formData.rashod_vid"
                :error-messages="formErrors.rashod_vid"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                disabled
                v-model="formData.count"
                label="Кол-во"
              ></v-text-field
            ></v-col>
            <v-col cols="3">
              <v-text-field
                v-model="formData.price"
                :error-messages="formErrors.price"
                label="Цена"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="" cols="12">
              <v-text-field
                v-model="formData.exact_name"
                label="Точное наименование"
                hide-details
                class=""
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="flex-column">
          <v-col class="" cols="12" sm="12">
            <p class="font-weight-bold">Укажите тип оплаты</p>
          </v-col>
          <v-row>
            <v-col class="" cols="12" sm="12">
              <Autocomplete
                :field="fieldsTemplate.type_pay"
                v-model="formData.type_pay"
                @change="changeAutocomplete"
                :disabled="disabledField(fieldsTemplate.city_id)"
                :formData="formData"
                :error-messages="formErrors.type_pay"
              />
            </v-col>
          </v-row>
          <v-row v-if="showField('dropzone', fieldsTemplate.check_docs)">
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
          <v-row v-else-if="showField('select', fieldsTemplate.req_zr_id)">
            <v-col class="" cols="12" sm="12">
              <Autocomplete
                :field="fieldsTemplate.req_zr_id"
                v-model="formData.req_zr_id"
                :error-messages="formErrors.req_zr_id"
                @change="changeAutocomplete"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      {{ fields }}
      <div class="w-100 d-flex justify-end mt-5">
        <v-btn small @click="$emit('closePopup')" color="transparent mr-3"
          >Закрыть</v-btn
        >
        <v-btn small @click="sendData" color="primary">Завершить</v-btn>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
