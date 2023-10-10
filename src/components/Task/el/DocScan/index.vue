<template>
  <div class="doc-scan">
    <div>Проверка документов:</div>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header>
          <v-row align="center">
            <v-icon class="mr-2" v-if="true" small>$IconMain</v-icon>
            <span>Item</span>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="false" justify="between">
            <v-col>
              <span>Скан:</span>
              <v-icon small>$IconMain</v-icon>
            </v-col>
            <v-col class="d-flex">
              <v-btn depressed> Отклонить </v-btn>
              <v-btn depressed> Принять </v-btn>
            </v-col>
          </v-row>
          <FormError v-else>Документы не приложены. См. комментарий</FormError>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
