<template>
  <div>
    <TextInfo :infoObj="{ textInfo }"></TextInfo>
    <FormTitle
      :listNames="listNames"
      v-for="(item, index) in docs"
      :docs="item"
      :key="index"
      @confirmed="addConfirmed"
      @unconfirmed="addUnconfirmed"
    ></FormTitle>
    <FormComment />
    <v-btn @click="clickCheckBtn" color="primary" block> Завершить </v-btn>
    <!--    <v-card-title-->
    <!--      class="d-flex justify-center align-center font-weight-medium py-1"-->
    <!--    >-->
    <!--      Title-->
    <!--    </v-card-title>-->
    <!--    <TextInfo :infoObj="textInfo"></TextInfo>-->
    <!--    <FormTitle :params="{}"></FormTitle>-->
    <!--    <FormTitle-->
    <!--      v-for="(item, index) in docs"-->
    <!--      :docs="item"-->
    <!--      :key="index"-->
    <!--      :name="getDocName(item.id)"-->
    <!--    ></FormTitle>-->
    <!--    <FormComment />-->
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
                <v-text-field label="ФИО"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <date-time-picker label="Дата рождения"></date-time-picker>
              </v-col>
              <v-col>
                <v-select
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
        :docsData="docsData"
        :listNames="listNames"
        :docs="docs"
      ></DocForm>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
