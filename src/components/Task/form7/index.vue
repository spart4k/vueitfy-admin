<template>
  <div>
    <div style="padding: 20px">
      <DocFormCorrect
        class="mb-10"
        @change="changeDocs"
        :docsData="docsData"
        :listNames="listNames"
        :docs="docs"
      ></DocFormCorrect>
      <FormComment />
    </div>
    <v-divider></v-divider>
    <v-row class="py-2 px-2" justify="end">
      <v-btn
        class="mr-2"
        :disabled="!isFormValid"
        color="info"
        @click="sendData"
      >
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
