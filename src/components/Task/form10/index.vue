<template>
  <div class="form">
    <div style="padding-top: 20px">
      <v-row>
        <v-col>
          <span class="font-weight-bold heading"
            >Проверьте закрывающие документы:</span
          >
          <div class="position-relative mb-8">
            <div v-if="files.length">
              <div class="alert" v-if="false">
                <!-- <span>{{ errors.message }}</span> -->
              </div>
              <!-- <v-list lines="one" class="list overflow-y-auto" max-height="220">
                <v-list-item
                  v-for="(file, fileID) in files"
                  :key="file"
                  class="list-item mb-3"
                >
                  <div class="list-left">
                    <div class="mr-10 list-id">
                      {{ fileID + 1 }}
                    </div>
                    <div class="list-img">
                      <v-img class="img" :src="file.link"></v-img>
                    </div>
                  </div>
                  <div class="list-name">{{ file.name }}</div>
                  <div class="list-remove" @click="removeFile(fileID)">
                    <IconDelete />
                  </div>
                </v-list-item>
              </v-list> -->
              <FormTitle
                :docName="getDocName(item.doc_id)"
                v-for="(item, index) in docs"
                :docs="item"
                :key="index"
                @confirmed="addConfirmed"
                @unconfirmed="addUnconfirmed"
              ></FormTitle>
            </div>

            <div v-if="!files.length" class="text-center mt-4">
              <span class="font-weight-regular text-subtitle-1"
                >Документы не загружены</span
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>
            <span class="font-weight-bold heading"
              >Укажите сумму закрывающих документов:</span
            >
            <v-text-field
              variant="outlined"
              :value="sum"
              min="0"
              @input="changeSum"
              type="number"
              class="sum-input"
              label="Сумма"
            >
            </v-text-field>
            <div class="d-flex justify-end">
              <v-btn
                @click="sendDocuments"
                small
                variant="tonal"
                color="orange"
                :disabled="sum < 1 && !files.length"
                >Приложить</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" justify="end">
        <v-btn
          class="mr-3"
          @click="$emit('closePopup')"
          color="blue-grey"
          small
        >
          <v-icon small>mdi-close</v-icon>
          Закрыть
        </v-btn>

        <v-btn class="mr-3" @click="false" color="info" small>
          <v-icon small>mdi-subdirectory-arrow-right</v-icon>
          Перейти
        </v-btn>

        <!-- FIXME: починить disabled -->
        <v-btn
          color="info"
          @click="sendTaskFinish"
          small
          :disabled="!files.length"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup"></script>

<style src="./index.scss" lang="scss" scoped></style>
