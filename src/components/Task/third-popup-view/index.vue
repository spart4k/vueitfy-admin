<template>
  <div>
    <div style="padding: 10px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd: data.entity.data_rojd.split('-').reverse().join('.'),
        }"
      />
      <!-- <div class="v-card__title d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span>
        &nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </div> -->

      <TextInfo :infoObj="textInfo" class="mb-2" />
      <v-row> Проверьте документы: </v-row>
      <FormError>{{ JSON.parse(data.task.dop_data).comment }}</FormError>
      <div>
        <template>
          <v-row
            justify="space-between"
            class="py-3"
            :class="{
              confirmed: !isShowBtnArray[index],
            }"
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
              <v-btn class="mr-3" fab x-small @click="addToDenied(index)" icon>
                <v-icon :color="isShowBtnArray[index] ? 'green' : ''" x-small
                  >$IconGalka</v-icon
                >
              </v-btn>
              <v-btn icon fab x-small tag="label">
                <input
                  class="d-none"
                  type="file"
                  id="file"
                  ref="file"
                  accept="image/*"
                  @change="uploadChangedFile($event, index)"
                />
                <v-icon color="orange" x-small>$IconEdit</v-icon>
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
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        small
        color="info"
        :disabled="!isLoadImage && !comment"
        @click="sendDoneTask"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
