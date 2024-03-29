<template>
  <div>
    <div style="padding-top: 20px">
      <v-row>
        <v-col>
          <!--  -->
          <span class="text-h6 font-weight-bold">
            Назначение №
            <span class="text-decoration-underline">{{ purpose.id }}</span>
            на дату {{ purpose.date }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>
            <span class="font-weight-bold pr-2">Персонаж:</span>
            <span class="text-weight-bold">{{ purpose.person }}</span>
          </div>
          <div>
            <span class="font-weight-bold pr-2">Должность:</span>
            <span class="text-weight-bold">{{ purpose.position }}</span>
          </div>
          <div>
            <span class="font-weight-bold pr-2">Объект:</span>
            <span class="text-weight-bold">{{ purpose.object }}</span>
          </div>
        </v-col>
      </v-row>
      <hr class="mt-4 mb-4" style="border-color: rgba(0, 0, 0, 0.089)" />
      <v-row class="py-2" justify="end">
        <v-btn class="mr-3" @click="sendTaskFinish" color="info" small>
          <v-icon small>mdi-content-save</v-icon>
          Завершить
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
