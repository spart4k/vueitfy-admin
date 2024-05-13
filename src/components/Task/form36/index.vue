<template>
  <div class="">
    <div style="padding: 10px">
      <div style="margin-bottom: 30px" v-if="!showNextStep">
        <PersTitle
          :data="{
            surname: data.entity.surname,
            name_n: data.entity.name_n,
            patronymic: data.entity.patronymic,
            dataRojd,
          }"
        />
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
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
      <FormError v-if="dopData && dopData.comment" class="mb-5">
        {{ dopData.comment }}
      </FormError>
      <div class="form">
        <DocForm
          v-if="docs && docs.length"
          class="mb-10"
          @changeDocs="changeDocs"
          :docsData="docsData"
          :listNames="listNames"
          :docs="docs"
          :entity="entity"
          :showDropzone="true"
          :showFields="false"
          :showScan="false"
          :task="JSON.parse(data.task.dop_data)"
          ref="docFormRef"
          :withoutSave="true"
        ></DocForm>
      </div>
      <div class="w-100 d-flex justify-end mt-5">
        <v-btn small @click="$emit('closePopup')" color="transparent mr-3"
          >Закрыть</v-btn
        >
        <v-btn small :disabled="false" @click="sendData" color="primary"
          >Завершить</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
