<template>
  <div>
    <Nav/>
    <v-main>
      <slot></slot>
      <Alert/>
    </v-main>
  </div>
</template>
<style lang="scss" module scoped src="./style.scss"></style>
<script src="./script.js"></script>