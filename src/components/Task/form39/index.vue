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
        <v-row class="mb-4 mt-5 d-flex">
          <v-col class="pl-0 pr-0" :cols="12" :sm="4">
            <p class="font-weight-bold text-h7">Статусы от менеджеров:</p>
          </v-col>
          <!-- <v-row class="mt-0 mb-1">
            <v-col cols="12" sm="6">Менеджер</v-col>
            <v-col cols="12" sm="6">Статус: </v-col>
          </v-row> -->
          <v-col class="pl-0 pr-0" :cols="12" :sm="8">
            <v-row
              class="mt-0"
              :key="manager.id"
              v-for="manager in data.data.status_data"
            >
              &nbsp;{{ manager.account_name }} &nbsp;
              {{ manager.status_id === 1 ? 'Работает' : 'Не работает' }}
              <!-- <v-col class="pl-0 pr-0" cols="12" sm="6">{{
                manager.account_name
              }}</v-col>
              <v-col class="pl-0 pr-0" cols="12" sm="6">
                {{
                  manager.status_id === 1 ? 'Работает' : 'Не работает'
                }}</v-col
              > -->
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div v-show="!isWire" class="">
        <Autocomplete
          class="mt-3"
          :field="fieldsTemplate.direction_id"
          v-model="formData.direction_id"
          @change="changeAutocomplete"
        />
        <Autocomplete
          class="mt-3"
          :field="fieldsTemplate.object_id"
          v-model="formData.object_id"
          @change="changeAutocomplete"
        />
        <Autocomplete
          class="mt-3"
          :field="fieldsTemplate.account_json"
          v-model="formData.account_json"
          @change="changeAutocomplete"
        />
      </div>

      <div class="w-100 d-flex justify-end mt-5">
        <v-btn class="mr-3" small color="error" @click="isWire = !isWire">
          <v-icon small color="green" class="mr-2" v-if="isWire"
            >$IconGalka</v-icon
          >
          Уволен</v-btn
        >
        <v-btn small @click="$emit('closePopup')" color="transparent mr-3"
          >Закрыть</v-btn
        >
        <v-btn small @click="sendData" color="primary">Завершить</v-btn>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
