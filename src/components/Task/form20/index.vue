<template>
  <div>
    <div style="padding-top: 20px">
      <PersTitle
        :data="{
          surname: data.data.personal.surname,
          name_n: data.data.personal.name_n,
          patronymic: data.data.personal.patronymic,
          dataRojd,
        }"
      />
      <FormError v-if="dopData && dopData.comment" class="mb-5">
        {{ dopData.comment }}
      </FormError>
      <v-row>
        <v-col>
          <div class="mb-3" style="font-weight: 600">
            Внесите данные личного ключа:
          </div>
        </v-col>
      </v-row>
      <v-form>
        <v-row>
          <v-col>
            <span>Скан:</span>
            <a download :href="$root.env.VUE_APP_STORE + dopData.photo_path"
              ><v-icon left small> $IconDocument </v-icon></a
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.key"
              v-model="formData.user_key"
              label="Ключ"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :error-messages="keyFormErrors.name"
              v-model="formData.fio"
              label="ФИО"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <v-textarea
              v-model="comment"
              rows="2"
              clearable
              label="Комментарий"
              class="mb-2"
            ></v-textarea>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <v-checkbox
              v-model="formData.is_stager"
              label="Стажерская"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="mb-5"></v-divider>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" color="blue-grey" small>
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        :disabled="vForm.$invalid"
        @click="completeTask"
        color="info"
        small
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
