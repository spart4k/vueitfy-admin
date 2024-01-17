<template>
  <v-snackbar :color="notifies?.color" :value="notifies?.isShow">
    <p v-html="notifies?.content"></p>
    <template v-slot:action="{ attrs }">
      <v-icon class="mr-2" small v-bind="attrs" @click="hideMessage">
        $IconClose
      </v-icon>
      <!--<v-btn text v-bind="attrs" @click="hideMessage"></v-btn>-->
    </template>
  </v-snackbar>
</template>
<script src="./setup.js"></script>
