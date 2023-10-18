<template>
  <div>
    <div style="padding: 10px">
      <TextInfo :infoObj="textInfo" />
      <v-row> Проверьте документы: </v-row>
      <FormError>{{ JSON.parse(data.task.dop_data).comment }}</FormError>
      <div>
        <template>
          <v-row
            justify="space-between"
            class="py-3"
            v-for="(item, index) in data.data.docs"
            :key="index"
          >
            <v-col cols="auto">
              <div class="accept-docs">
                <div style="width: 70px; height: 45px">
                  <img
                    style="object-fit: contain; width: 70px; height: 45px"
                    :src="imagePreview[index]"
                    @click="
                      () => {
                        setImageForPopup(index)
                        isImgPopupOpen = true
                      }
                    "
                  />
                </div>
                <span>{{ data.data.docs_spr[item.doc_id] }}</span>
              </div>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <v-btn
                class="mr-3"
                fab
                x-small
                v-if="isShowBtnArray[index]"
                @click="addToDenied(index)"
              >
                <v-icon x-small>$IconStar</v-icon>
              </v-btn>
              <v-btn fab x-small tag="label">
                <input
                  class="d-none"
                  type="file"
                  id="file"
                  ref="file"
                  accept="image/*"
                  @change="handleFileUpload($event, index)"
                />
                <v-icon x-small>$IconEdit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </template>
      </div>
      <FormComment v-model="watchForComment" />
    </div>
    <FormPopupPhoto
      :src="imageShowPopup"
      v-if="isImgPopupOpen"
      @close="isImgPopupOpen = false"
    />
    <v-divider></v-divider>
    <v-row class="py-2 px-5" justify="end">
      <v-btn
        class="mr-2"
        color="info"
        :disabled="!isFormValid"
        @click="sendDoneTask"
      >
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
