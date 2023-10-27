<template>
  <div>
    <div style="padding: 20px">
      <div class="mb-3">
        <span style="font-weight: 700; font-size: 20px"
          >Назначение {{ data.entity.id }} на дату {{ data.entity.date_target }}
        </span>
      </div>
      <div
        v-if="
          data.entity.doljnost_id == 5 ||
          data.entity.doljnost_id == 7 ||
          data.entity.doljnost_id == 32
        "
      >
        <!-- ($entity['doljnost_id'] == 5 || $entity['doljnost_id'] == 7 || $entity['doljnost_id'] == 32) -->
        <span>Приложите выработку</span>

        <Dropzone
          :options="{
            withoutSave: false,
            folder: 'tmp',
          }"
        ></Dropzone>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn :disabled="true" class="mr-2" small color="info">
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
