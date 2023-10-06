<template>
  <div>
    <v-card-title
      class="d-flex justify-center align-center font-weight-medium py-1"
    >
      Title
    </v-card-title>
    <TextInfo :infoObj="textInfo"></TextInfo>
    <FormTitle :params="{}"></FormTitle>
    <FormComment />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
