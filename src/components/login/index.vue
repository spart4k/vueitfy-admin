<template>
  <div class="login">
    <v-card class="pa-5">
      <v-form>
        <v-container>
          {{ vForm.password.$errors }}
          <v-row>
            <v-text-field
              v-model="formData.login"
              label="Имя пользователя"
              required
              :error-messages="vForm.password.$errors"
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="formData.password"
              type="password"
              label="Пароль"
              required
              :error-messages="vForm.password.$errors"
            />
          </v-row>
        </v-container>
      </v-form>
      <v-btn :loading="loading" @click="auth" color="primary" block>
        Войти
      </v-btn>
    </v-card>
    <!-- <Alert /> -->
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
