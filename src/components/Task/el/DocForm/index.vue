<template>
  <div>
    <div>Приложенные документы:</div>
    <v-expansion-panels>
      <v-expansion-panel v-for="doc in docs" :key="doc.id">
        <v-expansion-panel-header>
          <div style="position: relative">
            <span
              class="form-status"
              :class="{
                filled: formObj[doc.doc_id].validate(),
                noFilled: !formObj[doc.doc_id].validate(),
                visible: formObj[doc.doc_id].touchedForm,
              }"
            >
              <v-icon
                x-small
                color="green"
                v-if="
                  formObj[doc.doc_id].touchedForm &&
                  formObj[doc.doc_id].validate()
                "
                >$IconMain</v-icon
              >
              <v-icon
                x-small
                color="red"
                v-else-if="
                  formObj[doc.doc_id].touchedForm &&
                  !formObj[doc.doc_id].validate()
                "
                >$IconClose</v-icon
              >
            </span>
            <span style="padding-left: 15px">{{ listNames[doc.id] }}</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <span>Скан:</span>
            <a target="_blank" :href="doc.path_doc">scan</a>
          </div>
          <!--Паспорт-->
          <div v-if="doc.doc_id === 1">
            <v-row>
              <v-col>
                <v-text-field
                  maxlength="6"
                  v-model="formObj[doc.doc_id].formData.pasp_ser"
                  label="Серия"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  maxlength="10"
                  v-model="formObj[doc.doc_id].formData.pasp_num"
                  label="Номер"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  maxlength="8"
                  v-model="formObj[doc.doc_id].formData.pasp_kod_podr"
                  label="К/П"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <!--                <date-time-picker-->
                <!--                  v-model="formObj[doc.doc_id].formData.pasp_data_vid"-->
                <!--                  label="Дата выдачи"-->
                <!--                ></date-time-picker>-->
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.pasp_data_vid"
                      label="Дата выдачи"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.pasp_data_vid"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.pasp_kem"
                  label="Кем выдан"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Снилс-->
          <div v-else-if="doc.doc_id === 2">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  maxlength="14"
                  v-model="formObj[doc.doc_id].formData.snils"
                  label="Номер"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Банковская карта-->
          <div v-else-if="doc.doc_id === 3"></div>
          <!--Адрес регистрации-->
          <div v-else-if="doc.doc_id === 4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.registration_address"
                  label="Адрес регистрации"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Патент-->
          <div v-else-if="doc.doc_id === 5">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.patent_ser"
                  label="Серия"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.patent_num"
                  label="Номер"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.patent_prof"
                  label="Профессия"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Паспорт, страница 2-->
          <div v-else-if="doc.doc_id === 6">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.pasp_address_reg"
                  label="Адрес регистрации"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Мед.книжка-->
          <div v-else-if="doc.doc_id === 8">
            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.med_book_date"
                      label="Дата выдачи"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.med_book_date"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--Вид на жительство-->
          <div v-else-if="doc.doc_id === 9">
            <v-row>
              <v-col>
                <v-text-field
                  maxlength="6"
                  v-model="formObj[doc.doc_id].formData.view_home_ser"
                  label="Серия"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  maxlength="10"
                  v-model="formObj[doc.doc_id].formData.view_home_num"
                  label="Номер"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  maxlength="8"
                  v-model="formObj[doc.doc_id].formData.view_home_podr"
                  label="К/П"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.view_home_data_vid"
                      label="Дата выдачи"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.view_home_data_vid"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.view_home_kem"
                  label="Кем выдан"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Миграционная карта-->
          <div v-else-if="doc.doc_id === 10">
            <v-row>
              <v-col>
                <v-text-field
                  maxlength="6"
                  v-model="formObj[doc.doc_id].formData.migr_card_ser"
                  label="Серия"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  maxlength="10"
                  v-model="formObj[doc.doc_id].formData.migr_card_num"
                  label="Номер"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.migr_card_data_in"
                      label="Дата въезда"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.migr_card_data_in"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-menu
                  v-model="datePickerSecondOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.migr_card_data_out"
                      label="Дата выезда"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.migr_card_data_out"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--Чек-патент первичный-->
          <div v-else-if="doc.doc_id === 13">
            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="
                        formObj[doc.doc_id].formData.check_patent_date_pay
                      "
                      label="Дата оплаты"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.check_patent_date_pay"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--Регистрация стр. 2-->
          <div v-else-if="doc.doc_id === 14">
            <v-row>
              <v-col cols="4">
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="
                        formObj[doc.doc_id].formData
                          .registration_date_do_docs_in
                      "
                      label="Дата с"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="
                      formObj[doc.doc_id].formData.registration_date_do_docs_in
                    "
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="datePickerSecondOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="
                        formObj[doc.doc_id].formData.registration_date_c_docs_in
                      "
                      label="Дата с"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="
                      formObj[doc.doc_id].formData.registration_date_c_docs_in
                    "
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--Патент стр. 2-->
          <div v-else-if="doc.doc_id === 15">
            <v-row>
              <v-col cols="4"
                ><v-text-field
                  v-model="formObj[doc.doc_id].formData.patent_region"
                  label="Регион"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row>
              <v-col>
                <date-time-picker
                  v-model="formObj[doc.doc_id].formData.patent_date_docs_in"
                  label="Дата выдачи"
                ></date-time-picker>
              </v-col>
            </v-row>
          </div>
          <!--ИНН-->
          <div v-else-if="doc.doc_id === 17">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.inn"
                  label="ИНН"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--Экзамен РФ-->
          <div v-else-if="doc.doc_id === 18">
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="formObj[doc.doc_id].formData.ekz_rf"
                  label="Экзамен сдан"
                  color="primary"
                  value="primary"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </div>
          <!--Чек-патент текущий-->
          <div v-else-if="doc.doc_id === 19">
            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="
                        formObj[doc.doc_id].formData.check_patent_date_pay_now
                      "
                      label="Дата оплаты"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="
                      formObj[doc.doc_id].formData.check_patent_date_pay_now
                    "
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--Вид на жительство стр. 2-->
          <div v-else-if="doc.doc_id === 22">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.view_home_address_reg"
                  label="Адрес регистрации"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <!--мед осмотр-->
          <div v-else-if="doc.doc_id === 23">
            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerOpen"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  z-index="20"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formObj[doc.doc_id].formData.med_view_docs_in"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="z-index"
                    v-model="formObj[doc.doc_id].formData.med_view_docs_in"
                    min="1950-01-01"
                    color="primary"
                    locale="ru-RU"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!--мед осмотр ID-->
          <div v-else-if="doc.doc_id === 24">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formObj[doc.doc_id].formData.id_card"
                  label="ID"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
