<template>
  <div>
    <div style="padding: 10px">
      <v-card-title class="py-1 justify-center">
        Назначение <a href="#">&nbsp;№234234&nbsp;</a> на дату 07.02.2023
      </v-card-title>
      <TextInfo :infoObj="infoObj" />
      <div>
        <div>Путевой лист:</div>
        <div v-if="directionToMagnit">
          <a download href="#">
            <img style="width: 100%" src="/file/get/:folder/:file" alt="#" />
          </a>
        </div>
        <div v-else>Не приложен</div>
      </div>
      <FormComment
        v-model="formData.comment"
        :errors="formErrors.comment"
      ></FormComment>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn @click="confirm" class="mr-2" small color="info">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn @click="reject" class="mr-2" small color="error">
        <v-icon left> $IconClose </v-icon>
        Отклонить
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
