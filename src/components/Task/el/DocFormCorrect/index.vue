<template>
  <div>
    <div class="mb-2">Приложенные документы:</div>
    <v-expansion-panels v-model="panel" multiple accordion>
      <template v-for="doc in docs">
        <v-expansion-panel v-if="formObj[doc.doc_id]" :key="doc.id">
          <v-expansion-panel-header>
            <div style="position: relative">
              <span class="form-status visible">
                <v-icon x-small color="green" v-if="correctedDocs[doc.id]">
                  $IconGalka
                </v-icon>
              </span>
              <span style="padding-left: 15px">{{
                listNames[doc.doc_id]
              }}</span>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <div>
                  <span>Скан:</span>
                  <a target="_blank" :href="doc.path_doc"
                    ><v-icon left small> $IconDocument </v-icon></a
                  >
                </div>
              </v-col>
            </v-row>
            <!--Паспорт-->
            <div v-if="doc.doc_id === 1">
              <v-row>
                <v-col>
                  <v-text-field
                    maxlength="6"
                    v-model="formObj[doc.doc_id].formData.pasp_ser"
                    label="Серия"
                    :error-messages="formObj[doc.doc_id].formErrors.pasp_ser"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="10"
                    v-model="formObj[doc.doc_id].formData.pasp_num"
                    label="Номер"
                    :error-messages="formObj[doc.doc_id].formErrors.pasp_num"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="8"
                    v-model="formObj[doc.doc_id].formData.pasp_kod_podr"
                    label="К/П"
                    :error-messages="
                      formObj[doc.doc_id].formErrors.pasp_kod_podr
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-menu
                    v-model="pasp_data_vid_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.pasp_data_vid
                        "
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
                    :error-messages="formObj[doc.doc_id].formErrors.pasp_kem"
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
                    :error-messages="formObj[doc.doc_id].formErrors.snils"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Банковская карта-->
            <div v-else-if="doc.doc_id === 3">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formObj[doc.doc_id].formData.invoice"
                    :error-messages="formObj[doc.doc_id].formErrors.invoice"
                    label="Номер счёта"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-checkbox
                    v-model="formObj[doc.doc_id].formData.priority"
                    :error-messages="formObj[doc.doc_id].formErrors.priority"
                    label="Приоритет"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="position: relative; z-index: 30">
                  <v-select
                    v-model="formObj[doc.doc_id].formData.bank_id"
                    :error-messages="formObj[doc.doc_id].formErrors.bank_id"
                    persistent-hint
                    :items="bankItems"
                    label="Банк"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formObj[doc.doc_id].formData.fio"
                    :error-messages="formObj[doc.doc_id].formErrors.fio"
                    label="Карта на ФИО"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="formObj[doc.doc_id].formData.comment"
                    :error-messages="formObj[doc.doc_id].formErrors.comment"
                    label="Примечание"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn
                  :disabled="!formObj[doc.doc_id].validate()"
                  @click="sendBankCard"
                  color="warning"
                  small
                >
                  <v-icon left> $IconMain </v-icon>
                  Завершить
                </v-btn>
              </v-row>
            </div>
            <!--Адрес регистрации-->
            <div v-else-if="doc.doc_id === 4">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formObj[doc.doc_id].formData.registration_address"
                    label="Адрес регистрации"
                    :error-messages="
                      formObj[doc.doc_id].formErrors.registration_address
                    "
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
                    :error-messages="formObj[doc.doc_id].formErrors.patent_ser"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formObj[doc.doc_id].formData.patent_num"
                    label="Номер"
                    :error-messages="formObj[doc.doc_id].formErrors.patent_num"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formObj[doc.doc_id].formData.patent_prof"
                    label="Профессия"
                    :error-messages="formObj[doc.doc_id].formErrors.patent_prof"
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.pasp_address_reg
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Мед.книжка-->
            <div v-else-if="doc.doc_id === 8">
              <v-row>
                <v-col>
                  <v-menu
                    v-model="med_book_date_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.med_book_date
                        "
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.view_home_ser
                    "
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="10"
                    v-model="formObj[doc.doc_id].formData.view_home_num"
                    label="Номер"
                    :error-messages="
                      formObj[doc.doc_id].formErrors.view_home_num
                    "
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="8"
                    v-model="formObj[doc.doc_id].formData.view_home_podr"
                    label="К/П"
                    :error-messages="
                      formObj[doc.doc_id].formErrors.view_home_podr
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-menu
                    v-model="view_home_data_vid_open"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    z-index="20"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="
                          formObj[doc.doc_id].formData.view_home_data_vid
                        "
                        label="Дата выдачи"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.view_home_data_vid
                        "
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.view_home_kem
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Миграционная карта-->
            <div v-else-if="doc.doc_id === 10">
              <v-row>
                <v-col>
                  <v-text-field
                    :error-messages="
                      formObj[doc.doc_id].formErrors.migr_card_ser
                    "
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.migr_card_num
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-menu
                    v-model="migr_card_data_in_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.migr_card_data_in
                        "
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
                    v-model="migr_card_data_out_open"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    z-index="20"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="
                          formObj[doc.doc_id].formData.migr_card_data_out
                        "
                        label="Дата выезда"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.migr_card_data_out
                        "
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
                    v-model="check_patent_date_pay_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.check_patent_date_pay
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="z-index"
                      v-model="
                        formObj[doc.doc_id].formData.check_patent_date_pay
                      "
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
                    v-model="registration_date_do_docs_in_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors
                            .registration_date_do_docs_in
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="z-index"
                      v-model="
                        formObj[doc.doc_id].formData
                          .registration_date_do_docs_in
                      "
                      min="1950-01-01"
                      color="primary"
                      locale="ru-RU"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu
                    v-model="registration_date_c_docs_in_open"
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
                            .registration_date_c_docs_in
                        "
                        label="Дата с"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors
                            .registration_date_c_docs_in
                        "
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.patent_region
                    "
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu
                    v-model="patent_date_docs_in_open"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    z-index="20"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="
                          formObj[doc.doc_id].formData.patent_date_docs_in
                        "
                        label="Дата оплаты"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.patent_date_docs_in
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="z-index"
                      v-model="formObj[doc.doc_id].formData.patent_date_docs_in"
                      min="1950-01-01"
                      color="primary"
                      locale="ru-RU"
                    ></v-date-picker>
                  </v-menu>
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
                    :error-messages="formObj[doc.doc_id].formErrors.inn"
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
                    v-model="check_patent_date_pay_now_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors
                            .check_patent_date_pay_now
                        "
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
                    :error-messages="
                      formObj[doc.doc_id].formErrors.view_home_address_reg
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--мед осмотр-->
            <div v-else-if="doc.doc_id === 23">
              <v-row>
                <v-col>
                  <v-menu
                    v-model="med_view_docs_in_open"
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
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="
                          formObj[doc.doc_id].formErrors.med_view_docs_in
                        "
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
                    :error-messages="formObj[doc.doc_id].formErrors.id_card"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <v-row class="py-2 px-2" justify="end">
              <v-btn
                :disabled="!formObj[doc.doc_id].validate()"
                @click="() => confirmCorrect(doc)"
                color="warning"
                small
              >
                <v-icon left> $IconMain </v-icon>
                Исправлено
              </v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
