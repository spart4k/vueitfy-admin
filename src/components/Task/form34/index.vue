<template>
  <div class="">
    <div style="padding: 10px">
      <div class="mb-3" v-if="!showNextStep">
        <!-- <v-card-title class="d-flex justify-center text-h6">
          <span class="font-weight-bold text-h6">{{ entity.name }}</span
          >&nbsp;({{ dataRojd }} г.р)
        </v-card-title> -->
        <PersTitle
          :data="{
            surname: data.entity.surname,
            name_n: data.entity.name_n,
            patronymic: data.entity.patronymic,
            dataRojd,
          }"
        />
        <TextInfo class="mb-1" :infoObj="textInfo"></TextInfo>
        <!-- <FormTitle
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></FormTitle>
        <v-textarea
          v-model="comment"
          @input="commentError = ''"
          :error-messages="commentError"
          rows="2"
          clearable
          label="Комментарий"
          class="mb-2"
        ></v-textarea>
        <v-btn
          small
          @click="clickCheckBtn"
          color="primary"
          block
          :disabled="!isActiveBtnFirst"
          class="mb-1"
        >
          Завершить
        </v-btn>
        <v-btn small @click="$emit('closePopup')" color="blue-grey" block>
          Закрыть
        </v-btn> -->
      </div>
      <div class="">
        <v-row align="center">
          <v-icon class="mr-2" v-if="osnConfirmed !== null" small color="green"
            >$IconGalka</v-icon
          >
          <span style="font-size: 18px" class="font-weight-bold"
            >Выберите статус работника:</span
          >
        </v-row>
        <div class="w-100 d-flex justify-center mt-2">
          <v-btn
            small
            @click="isFire"
            :class="status === 'Работает' ? 'disabled' : ''"
            color="error mr-3"
            >Уволен</v-btn
          >
          <v-btn
            small
            @click="isWork"
            :class="status === 'Уволен' ? 'disabled' : ''"
            color="success"
            >Работает</v-btn
          >
        </div>
        <Autocomplete
          v-if="status === 'Работает'"
          class="mt-3"
          :field="autocompleteConfig"
          v-model="object"
        />
      </div>
      <div class="w-100 d-flex justify-end mt-5">
        <v-btn small @click="$emit('closePopup')" color="transparent mr-3"
          >Закрыть</v-btn
        >
        <v-btn small @click="sendData" :disabled="!isValid" color="primary"
          >Завершить</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
