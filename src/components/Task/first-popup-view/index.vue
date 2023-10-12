<template>
  <div>
    <div style="padding: 10px">
      <div v-if="isShow" style="margin-bottom: 30px">
        <TextInfo :infoObj="{ textInfo }"></TextInfo>
        <FormTitle
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></FormTitle>
        <FormComment v-model="comment" />
        <span class="danger" v-if="commentError"
          >Заполните поле комментарий!</span
        >
        <v-btn @click="clickCheckBtn" color="primary" block> Завершить </v-btn>
      </div>
      <div>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row align="center">
                <v-icon class="mr-2" v-if="true" small>$IconMain</v-icon>
                <span>Основные данные</span>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.fio"
                    label="ФИО"
                  ></v-text-field>
                </v-col>
              </v-row>
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
                        v-model="formData.birthday"
                        label="Дата рождения"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      class="z-index"
                      v-model="formData.birthday"
                      min="1950-01-01"
                      color="primary"
                      locale="ru-RU"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col style="position: relative; z-index: 30">
                  <v-select
                    v-model="formData.grazhdanstvo"
                    persistent-hint
                    :items="citizenItems"
                    label="Гражданство"
                  ></v-select>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <DocForm
          @change="changeDocs"
          :docsData="docsData"
          :listNames="listNames"
          :docs="docs"
        ></DocForm>
      </div>
    </div>

    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn :disabled="!isFormValid" color="info" @click="sendData">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
