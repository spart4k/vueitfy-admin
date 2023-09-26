<template>
  <v-snackbar :color="notifier.color" :value="notifier.isShow">
    <p>{{ notifier.content }}</p>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="hideMessage">Close</v-btn>
    </template>
  </v-snackbar>
</template>
<script src="./setup.js"></script>
