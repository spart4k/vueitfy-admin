<template>
  <div>
    <div style="padding-top: 20px">
      <span class="font-weight-bold text-h6"
        >Проверьте закрывающие документы:</span
      >
      <div class="position-relative mb-8">
        <!-- TODO: LIST -->
        <div>
          <v-list lines="one" class="overflow-y-auto" max-height="180">
            <v-list-item v-for="file in 3" :key="file" class="file-item mb-3">
              <div class="file-img">
                <v-img src="../../../assets/image/doc.png"></v-img>
              </div>
              <div class="file-name">Item {{ file * 1000 }}</div>
              <div class="file-remove" @click="removeFile">
                <IconDelete />
              </div>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <!-- TODO: INPUT -->
      <v-row class="pb-2 px-0" justify="center">
        <v-col class="ps-0" align-self="center">
          <span class="font-weight-bold text-h6"
            >Приложите закрывающие документы:</span
          >
          <DropZone @addFiles="addFiles" :options="dropzoneOptions"></DropZone>
          <!-- <DropZone
            :paramsForEmit="{ item: item.doc_id }"
            @addFiles="addFiles"
            :options="dropzoneOptions"
          ></DropZone> -->
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
        <v-btn
          color="info"
          @click="sendTaskFinish"
          small
          :disabled="!refds || (!disabledDocumentsAcc && !comment)"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" src="./index.scss"></style>
