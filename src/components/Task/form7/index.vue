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
      <div class="rejectedComment mb-2">
        <span>!</span> {{ rejectedComment }}
      </div>
      <DocMain
        :docMainData="docMainData"
        :isShow="isHasOsnDoc"
        :entity="data.entity"
        :correct="true"
        ref="docMainRef"
      />
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
        :correct="true"
        ref="docFormRef"
      ></DocForm>
      <!-- <FormComment /> -->
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

<style lang="scss" scoped>
.rejectedComment {
  // display: inline-flex;
  padding: 2px 10px;
  border: 1px dashed #ff5252;
  span {
    color: #ff5252;
  }
}
</style>
