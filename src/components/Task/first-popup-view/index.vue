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
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
