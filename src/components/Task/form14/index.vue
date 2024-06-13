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
      <FormError class="mb-4" v-if="commentData">
        {{ commentData }}
      </FormError>
      <TextInfo class="mb-3" :infoObj="textInfo"></TextInfo>

      <!-- <v-row class="pb-2 pt-1 px-0" justify="center">
        <v-col class="ps-0" cols="2" align-self="center"
          ><v-btn color="error" class="" small @click="emplyeeFired">
            <v-icon small>mdi-content-save</v-icon>
            Уволен
          </v-btn></v-col
        >
      </v-row> -->
      <!-- <div class="w-100 d-flex justify-center mt-2">
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
      </div> -->
      <div class="position-relative">
        <div class="mb-10">
          <DocForm
            v-if="listDocuments && listDocuments.length"
            @changeDocs="changeDocs"
            :docsData="listDocuments"
            :listNames="listNames"
            :docs="listDocuments"
            :entity="data.entity"
            :task="data.task"
            ref="docFormRef"
            title="Приложите документы:"
            :showFields="false"
            :confirm="true"
            :showScan="true"
            :fromTask="true"
          ></DocForm>
        </div>
        <v-row>
          <v-textarea
            v-model="comment"
            placeholder="Комментарий"
            class="pt-0"
            rows="2"
          ></v-textarea>
        </v-row>
      </div>

      <v-row class="mt-4 py-2" justify="end">
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
          :loading="loading"
          color="info"
          @click="sendTaskFinish"
          small
          :disabled="!isValid"
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
    z-index: 10;
  }
}
</style>
