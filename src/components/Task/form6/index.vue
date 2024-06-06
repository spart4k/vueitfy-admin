<template>
  <div>
    <div style="padding-top: 20px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd: data.entity.data_rojd.split('-').reverse().join('.'),
        }"
      />
      <TextInfo v-if="textInfo" class="mb-3" :infoObj="textInfo"></TextInfo>
      <span class="font-weight-bold mb2"
        ><v-icon small v-if="isLoadedImage || data.data.docs.length"
          >$IconGalka</v-icon
        >Прикрепите реквизиты:
      </span>
      <Dropzone
        class="mt-2"
        :options="{
          withoutSave: false,
          folder: 'tmp',
          removeble: false,
        }"
        @addFiles="addFiles"
      ></Dropzone>
      <v-row class="py-2" justify="end">
        <v-btn
          class="mr-2"
          small
          @click="$emit('closePopup')"
          color="blue-grey"
        >
          <v-icon small>mdi-close</v-icon>
          Закрыть
        </v-btn>
        <v-btn
          small
          color="info"
          :disabled="!isLoadedImage"
          @click="sendTaskFinish"
          :loading="loading"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped>
.overflow-inputs {
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.1);
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
