<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Имя пользователя"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Пароль"
            required
          ></v-text-field>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      v-bind:disabled = ""
      depressed
    ></v-btn>
    <!-- <Alert /> -->
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
