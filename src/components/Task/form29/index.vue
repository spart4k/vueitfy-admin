<template>
  <div>
    <div style="padding-top: 20px">
      <v-row>
        <v-col>
          <span class="font-weight-bold text-h6">
            Подтвердите увольнение сотрудника:
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div>
            <span class="font-weight-bold pr-2">Сотрудник:</span>
            <span class="text-weight-bold">{{ mockUser.name }}</span>
          </div>
          <div>
            <span class="font-weight-bold pr-2">Дата рождения:</span>
            <span class="text-weight-bold">{{ mockUser.birthday }}</span>
          </div>
          <div>
            <span class="font-weight-bold pr-2">Менеджер:</span>
            <span class="text-weight-bold">{{ mockUser.manager }}</span>
          </div>
          <div>
            <span class="font-weight-bold pr-2">Объект:</span>
            <span class="text-weight-bold">{{ mockUser.object }}</span>
          </div>
        </v-col>
      </v-row>
      <hr class="mt-4 mb-4" style="border-color: rgba(0, 0, 0, 0.089)" />
      <v-row class="py-2" justify="end">
        <v-btn class="mr-3" @click="false" color="info" small>
          <v-icon small>mdi-content-save</v-icon>
          Подтвердить
        </v-btn>
        <v-btn class="mr-3" color="red" @click="false" small :disabled="false">
          <v-icon small>mdi-close</v-icon>
          Отклонить
        </v-btn>
        <v-btn class="mr-3" @click="false" color="info" small>
          <v-icon small>mdi-subdirectory-arrow-right</v-icon>
          Перейти
        </v-btn>
        <v-btn class="mr-3" @click="$emit('closePopup')" color="grey" small>
          <v-icon small>mdi-close</v-icon>
          Закрыть
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup"></script>

<style lang="scss" scoped src="./style.scss"></style>
