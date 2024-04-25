<template>
  <div>
    <div style="padding-top: 20px">
      <span class="font-weight-bold heading"
        >Проверьте закрывающие документы:</span
      >
      <div class="position-relative mb-8">
        <!-- TODO: LIST -->
        <div v-if="true">
          <div class="alert text-center" v-if="errors.isActive">
            <span>{{ errors.message }}</span>
          </div>

          <DocAccepting
            :docName="item.name"
            v-for="(item, index) in formatedSchets"
            :docs="item"
            :key="index"
            @confirmed="addConfirmed"
            @unconfirmed="addUnconfirmed"
            ref="formRowsRef"
            :hideActions="true"
            :isShowRemove="item.valid === 2"
            @remove="removeDoc($event, index)"
          ></DocAccepting>
        </div>

        <div v-if="!formatedSchets?.length" class="text-center mt-4">
          <span class="font-weight-regular text-subtitle-1"
            >Документы не загружены</span
          >
        </div>
      </div>
      <!-- TODO: INPUT -->
      <v-row class="pb-2 px-0" justify="center">
        <v-col class="ps-0" align-self="center">
          <span class="font-weight-bold heading"
            >Приложите закрывающие документы:</span
          >
          <DropZone
            ref="dropZone"
            @addFiles="addFiles"
            :options="dropzoneOptions"
          ></DropZone>
          <!-- <DropZone
            :paramsForEmit="{ item: item.doc_id }"
            @addFiles="addFiles"
            :options="dropzoneOptions"
          ></DropZone> -->
          <v-row>
            <v-col cols="12">
              <div style="display: flex; justify-content: center">
                <v-btn
                  small
                  color="success"
                  :disabled="!attachedFile"
                  @click="sendCloseDocsSchet"
                >
                  Приложить
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- TODO: Комментарии -->
      <v-row>
        <v-textarea
          v-model="comment"
          placeholder="Комментарий"
          class="pt-0"
          rows="2"
        ></v-textarea>
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
        <!-- <v-btn
          color="info"
          @click="sendTaskFinish"
          small
          :disabled="(!comment.length && refds) || !disabledDocumentsAcc"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn> -->
        <!-- FIXME: починить disabled -->
        <v-btn
          color="info"
          @click="sendTaskFinish"
          small
          :disabled="!comment && JSON.parse(attached_amount).attached"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
