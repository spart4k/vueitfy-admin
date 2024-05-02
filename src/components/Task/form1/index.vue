<template>
  <div>
    <div style="padding: 10px">
      <PersTitle
        :data="{
          surname: data.entity.surname,
          name_n: data.entity.name_n,
          patronymic: data.entity.patronymic,
          dataRojd,
        }"
      />
      <div style="margin-bottom: 30px" v-if="!showNextStep">
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
        <DocAccepting
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></DocAccepting>
        <v-textarea
          v-model="comment"
          @input="commentError = ''"
          :error-messages="commentError"
          rows="2"
          name="comment"
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
        </v-btn>
      </div>
      <div v-if="showNextStep">
        <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>
        <DocMain
          :docMainData="docMainData"
          :isShow="isHasOsnDoc"
          :entity="data.entity"
          ref="docMainRef"
        />
        <DocForm
          v-if="docs && docs.length"
          @changeDocs="changeDocs"
          :docsData="docsData"
          :listNames="listNames"
          :docs="docs"
          :entity="entity"
          :task="data.task"
          ref="docFormRef"
          :showFields="true"
        ></DocForm>
      </div>
    </div>

    <v-divider></v-divider>
    <!-- {{ isValid }} -->
    <v-row class="py-2" justify="end" v-if="showNextStep">
      <v-btn class="mr-2" small @click="$emit('closePopup')" color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn small :disabled="!isValid" color="info" @click="sendData">
        <v-icon small>mdi-content-save</v-icon>
        Сохранить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
