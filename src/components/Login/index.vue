<template>
  <div class="login">
    <v-card>
      <v-card-title class="text-h5 login-header">Авторизация</v-card-title>
      <v-form class="pa-5">
        <container>
          <v-row>
            <v-col
              v-for="field in listFields"
              :key="field.id"
              :cols="field.position.cols"
              :sm="field.position.sm"
              class="field-col"
              :class="field.type"
            >
              <v-text-field
                v-if="showField('string', field)"
                :type="field.subtype"
                v-model="formData[field.name]"
                :label="field.label"
                :readonly="field.readonly"
                :name="field.name"
                :error-messages="formErrors[field?.name]"
              />
            </v-col>
          </v-row>
        </container>
        <v-btn
          class="mt-2"
          :loading="loading"
          @click.prevent="auth"
          color="primary"
          block
          type="submit"
        >
          Войти
        </v-btn>
      </v-form>
    </v-card>
    <!-- <Alert /> -->
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
