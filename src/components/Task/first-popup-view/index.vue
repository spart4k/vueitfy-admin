<template>
  <div>
    <TextInfo :infoObj="{ textInfo }"></TextInfo>
    <FormTitle
      :listNames="listNames"
      v-for="(item, index) in docs"
      :docs="item"
      :key="index"
    ></FormTitle>
    <FormComment />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
