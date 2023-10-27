<template>
  <div>
    <div style="padding: 20px">
      <span style="font-weight: 700; font-size: 20px"
        >{{ data.entity.name }} {{ data.entity.data_rojd }}</span
      >
      <div>
        <div>
          <span>Менеджер: {{ data.entity.account_name }}</span>
        </div>
        <div>
          <span>Объект: {{ data.entity.object_id }}</span>
        </div>
      </div>
      <span>Создайте расход на документы:</span>
      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn color="info"> Открыть </v-btn>
          </div>
        </v-col>
      </v-row>
      <!-- {{ getNameDoc(1) }} -->
      <v-row>
        <v-col>
          <div class="mb-10">
            <span style="font-size: 20px">Приложите документы</span>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item, index) in data.data.docs_zayavka"
                :key="index"
              >
                <v-expansion-panel-header>
                  <v-row align="center">
                    <span> {{ docs_spr[0] }} </span>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Dropzone
                    :options="{
                      withoutSave: false,
                      folder: 'tmp',
                    }"
                    @addFiles="addFiles"
                  ></Dropzone>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div style="display: flex; justify-content: center">
            <v-btn color="success"> Приложить </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
            }"
          ></Dropzone>
        </v-col>
        <v-col cols="6">
          <Dropzone
            :options="{
              withoutSave: false,
              folder: 'tmp',
            }"
          ></Dropzone>
        </v-col>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn color="info" class="mr-3">
          <v-icon left> $IconMain </v-icon>
          Завершить
        </v-btn>
        <v-btn color="blue-grey">
          <v-icon left> $IconMain </v-icon>
          Закрыть
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
