<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="d-flex justify-center text-h6">
        <span class="font-weight-bold text-h6">{{ data.entity.name }}</span
        >&nbsp;({{ data.entity.data_rojd.split('-').reverse().join('.') }} г.р)
      </v-card-title>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <span
        ><v-icon small v-if="isLoadedImage || data.data.docs">$IconGalka</v-icon
        >Прикрепите реквизиты</span
      >
      <Dropzone
        :options="{
          withoutSave: false,
          folder: 'tmp',
          removeble: false,
        }"
        @addFiles="addFiles"
      ></Dropzone>

      <v-row class="py-2" justify="end">
        <v-btn
          color="info"
          class="mr-3"
          :disabled="!isLoadedImage"
          @click="sendTaskFinish"
        >
          <v-icon small>mdi-content-save</v-icon>
          Завершить
        </v-btn>
        <v-btn @click="$emit('closePopup')" color="blue-grey">
          <v-icon small>mdi-close</v-icon>
          Закрыть
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
