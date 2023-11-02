<template>
  <div>
    <div style="padding: 20px">
      <FormError v-if="dopData && dopData.comment" class="mb-5">
        {{ dopData.comment }}
      </FormError>
      <div class="mb-3">Внесите данные личного ключа:</div>
      <v-form>
        <v-row>
          <span>Скан:</span>
          <a target="_blank" :href="'#'"
            ><v-icon left small> $IconDocument </v-icon></a
          >
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.key"
              v-model="keyForm.key"
              label="Ключ"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.name"
              v-model="keyForm.name"
              label="ФИО"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="keyForm.trainee"
              label="Стажерская"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>
      <v-textarea
        rows="2"
        clearable
        label="Комментарий"
        v-model="keyForm.comment"
        :error-messages="keyFormErrors.comment"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn
        :disabled="!keyFormValidate()"
        @click="completeTask"
        class="mr-2"
        small
        color="info"
      >
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn small color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
