<template>
  <div class="doc-scan">
    <div>Проверка документов:</div>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header> Item </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="between">
            <v-col>
              <span>Скан:</span>
              <v-icon small>$IconMain</v-icon>
            </v-col>
            <v-col class="d-flex">
              <v-btn depressed> Отклонить </v-btn>
              <v-btn depressed> Принять </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
