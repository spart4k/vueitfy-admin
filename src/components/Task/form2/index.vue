<template>
  <div>
    <div style="padding-top: 20px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd,
        }"
      />
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
      <DocMain
        :docMainData="docMainData"
        :isShow="isHasOsnDoc"
        :entity="data.entity"
        :confirm="true"
        ref="docMainRef"
        @rejectDoc="rejectOsnData"
        @confirmDoc="confirmOsnData"
        :readonly="true"
      />
      <!-- <DocFormWithConfirm
        v-if="docs && docs.length"
        class="mb-10"
        @change="changeDocs"
        :docsData="docsData"
        :bankData="bankData"
        :listNames="listNames"
        :docs="docs"
      ></DocFormWithConfirm> -->
      <DocForm
        v-if="docs && docs.length"
        class="mb-10"
        @changeDocs="changeDocs"
        :docsData="docsData"
        :bankData="bankData"
        :listNames="listNames"
        :docs="docs"
        :entity="entity"
        :task="JSON.parse(data.task.dop_data)"
        :confirm="true"
        ref="docFormRef"
        :showFields="true"
      ></DocForm>
      <v-textarea
        v-model="comment"
        @input="commentErr = []"
        :error-messages="commentErr"
        rows="2"
        name="comment"
        clearable
        label="Комментарий"
        class="mb-2"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <v-row class="py-2 px-2" justify="end">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn small :disabled="!isValid" color="info" @click="sendData">
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
