<template>
  <div>
    <div class="mb-2">Приложенные документы:</div>
    <v-expansion-panels v-model="panel" multiple accordion>
      <template v-for="doc in docs">
        <v-expansion-panel v-if="formObj[doc.doc_id]" :key="doc.id">
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
                  v-if="confirmedDocs.includes(doc.id)"
                  >$IconMain</v-icon
                >
                <v-icon
                  x-small
                  color="red"
                  v-else-if="rejectedDocs.includes(doc.id)"
                  >$IconClose</v-icon
                >
              </span>
              <span style="padding-left: 15px">{{
                listNames[doc.doc_id]
              }}</span>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <span>Скан:</span>
              <a target="_blank" :href="doc.path_doc"
                ><v-icon left small> $IconDocument </v-icon></a
              >
            </div>
            <!--Паспорт-->
            <div v-if="doc.doc_id === 1">
              <v-row>
                <v-col>
                  <v-text-field
                    maxlength="6"
                    readonly
                    v-model="formObj[doc.doc_id].formData.pasp_ser"
                    label="Серия"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="10"
                    readonly
                    v-model="formObj[doc.doc_id].formData.pasp_num"
                    label="Номер"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="8"
                    readonly
                    v-model="formObj[doc.doc_id].formData.pasp_kod_podr"
                    label="К/П"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.pasp_data_vid"
                    label="Дата выдачи"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
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
                    readonly
                    v-model="formObj[doc.doc_id].formData.snils"
                    label="Номер"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Банковская карта-->
            <div v-else-if="doc.doc_id === 3">
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.number"
                    :error-messages="formObj[doc.doc_id].formErrors.number"
                    label="Номер счёта"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-checkbox
                    readonly
                    v-model="formObj[doc.doc_id].formData.priority"
                    :error-messages="formObj[doc.doc_id].formErrors.priority"
                    label="Приоритет"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.bank_id"
                    :error-messages="formObj[doc.doc_id].formErrors.bank_id"
                    label="Банк"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.cart_on_fio"
                    :error-messages="formObj[doc.doc_id].formErrors.cart_on_fio"
                    label="Карта на ФИО"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    readonly
                    v-model="formObj[doc.doc_id].formData.prim"
                    :error-messages="formObj[doc.doc_id].formErrors.prim"
                    label="Примечание"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </div>
            <!--Адрес регистрации-->
            <div v-else-if="doc.doc_id === 4">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    readonly
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
                    readonly
                    v-model="formObj[doc.doc_id].formData.patent_ser"
                    label="Серия"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.patent_num"
                    label="Номер"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
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
                    readonly
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
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.med_book_date"
                    label="Дата выдачи"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Вид на жительство-->
            <div v-else-if="doc.doc_id === 9">
              <v-row>
                <v-col>
                  <v-text-field
                    maxlength="6"
                    readonly
                    v-model="formObj[doc.doc_id].formData.view_home_ser"
                    label="Серия"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="10"
                    readonly
                    v-model="formObj[doc.doc_id].formData.view_home_num"
                    label="Номер"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="8"
                    readonly
                    v-model="formObj[doc.doc_id].formData.view_home_podr"
                    label="К/П"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.view_home_data_vid"
                    label="Дата выдачи"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
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
                    readonly
                    v-model="formObj[doc.doc_id].formData.migr_card_ser"
                    label="Серия"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    maxlength="10"
                    readonly
                    v-model="formObj[doc.doc_id].formData.migr_card_num"
                    label="Номер"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.migr_card_data_in"
                    label="Дата въезда"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.migr_card_data_out"
                    label="Дата выезда"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Чек-патент первичный-->
            <div v-else-if="doc.doc_id === 13">
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.check_patent_date_pay"
                    label="Дата оплаты"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Регистрация стр. 2-->
            <div v-else-if="doc.doc_id === 14">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    readonly
                    v-model="
                      formObj[doc.doc_id].formData.registration_date_do_docs_in
                    "
                    label="Дата с"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="
                      formObj[doc.doc_id].formData.registration_date_c_docs_in
                    "
                    label="Дата с"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Патент стр. 2-->
            <div v-else-if="doc.doc_id === 15">
              <v-row>
                <v-col cols="4"
                  ><v-text-field
                    v-model="formObj[doc.doc_id].formData.patent_region"
                    readonly
                    label="Регион"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.patent_date_docs_in"
                    label="Дата выдачи"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--ИНН-->
            <div v-else-if="doc.doc_id === 17">
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
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
                    readonly
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
                  <v-text-field
                    readonly
                    v-model="
                      formObj[doc.doc_id].formData.check_patent_date_pay_now
                    "
                    label="Дата оплаты"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--Вид на жительство стр. 2-->
            <div v-else-if="doc.doc_id === 22">
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
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
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.med_view_docs_in"
                    label="Дата"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <!--мед осмотр ID-->
            <div v-else-if="doc.doc_id === 24">
              <v-row>
                <v-col>
                  <v-text-field
                    readonly
                    v-model="formObj[doc.doc_id].formData.id_card"
                    label="ID"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <v-row class="py-2 px-2" justify="end">
              <v-btn
                @click="() => rejectDoc(doc.id)"
                class="mr-2"
                color="error"
              >
                <v-icon left> $IconClose </v-icon>
                Отклонить
              </v-btn>
              <v-btn @click="() => confirmDoc(doc.id)" color="primary">
                <v-icon left> $IconMain </v-icon>
                Подтвердить
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
