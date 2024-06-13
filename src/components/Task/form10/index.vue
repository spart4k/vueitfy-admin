<template>
  <div class="form">
    <div style="padding-top: 20px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Заявка на расход&nbsp;
        <span
          @click="openZayavka(data.data.zayavka.id)"
          class="col-btn form-link"
          >№{{ data.data.zayavka.id }}&nbsp;</span
        >
      </v-card-title>
      <v-row>
        <v-col>
          <span class="font-weight-bold heading"
            >Проверьте закрывающие документы:</span
          >
          <div class="position-relative mb-0">
            <div class="mb-6" v-if="files.length">
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
              <DocAccepting
                :docName="item.name"
                v-for="(item, index) in formatedSchets"
                :docs="item"
                :key="index"
                @confirmed="addConfirmed(item)"
                @unconfirmed="addUnconfirmed(item)"
                ref="formRowsRef"
                :hideActions="accepted"
              ></DocAccepting>
            </div>
            <div
              v-if="
                zayavkaNameList.length && data.data.zayavka.payment_type === 3
              "
              class="zayavka-items"
            >
              <ZayavkaItem
                v-for="item in data.data.zayavka.items"
                :key="item.id"
                :item="item"
                :list="zayavkaNameList"
                ref="zayavkaItems"
              />
            </div>

            <div v-if="!files.length" class="text-center mt-4">
              <span class="font-weight-regular text-subtitle-1"
                >Документы не загружены</span
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="!accepted">
        <v-col>
          <div>
            <!-- <v-text-field
              variant="outlined"
              :value="sum"
              min="0"
              @input="changeSum"
              type="number"
              class="sum-input"
              label="Сумма"
            >
            </v-text-field> -->
            <v-textarea
              v-model="comment"
              placeholder="Комментарий"
              class="pt-0"
              rows="2"
            ></v-textarea>
            <div class="d-flex justify-end">
              <v-btn
                @click="answer"
                small
                color="warning"
                class="black--text mr-4"
                :disabled="!allChecked"
                >Ответить</v-btn
              >
              <v-btn
                @click="acceptSchets"
                small
                color="green"
                class="white--text"
                :disabled="!allChecked"
                >Принять</v-btn
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

        <!-- <v-btn class="mr-3" @click="openZayavka" color="info" small>
          <v-icon small>mdi-subdirectory-arrow-right</v-icon>
          Перейти
        </v-btn> -->

        <!-- FIXME: починить disabled -->
        <v-btn
          color="info"
          @click="sendTaskFinish"
          small
          :loading="loading"
          :disabled="!allChecked"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
    </div>
    <Popup
      :options="{
        width: config.detail.width,
        portal: 'table-detail',
      }"
      v-if="config.detail && config.detail.type === 'popup' && popupForm.isShow"
    >
      <router-view
        :detail="config.detail"
        :class="[...config.detail.bootstrapClass, ...config.detail.classes]"
        @closePopup="closePopupForm"
        @refreshData="refreshData"
      />
    </Popup>
  </div>
</template>

<script src="./setup"></script>

<style src="./index.scss" lang="scss" scoped></style>
