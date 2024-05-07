<template>
  <div>
    <div style="padding-top: 20px">
      <v-card-title class="py-1 justify-center font-weight-bold text-h6">
        Назначение &nbsp;<a href="#" class="text-h6">№{{ entity.id }}</a
        >&nbsp; на дату {{ dateTarget }}
        <v-icon v-if="typeShift == 2" color="#8f8e77"
          >mdi-moon-waning-crescent</v-icon
        >
        <v-icon v-else color="#FFF100">mdi-white-balance-sunny</v-icon>
      </v-card-title>
      <div v-if="fileOutput">
        <span>Скан:</span>
        <a download :href="$root.env.VUE_APP_STORE + fileOutput"
          ><v-icon left small> $IconDocument </v-icon></a
        >
      </div>
      <TextInfo class="mb-3" :infoObj="textInfo" />
      <FormError class="mb-4" v-if="rejectedPrice">
        Отсутствует тариф: {{ rejectedPrice }}
      </FormError>
      <div>
        <v-row
          v-for="(group, i) in formGroup"
          :key="i"
          class="px-0"
          style="height: 50px"
        >
          <v-col class="px-0" cols="6">
            <!-- {{ group.formData }} -->
            <Autocomplete
              :field="autocompleteConfig"
              class="mr-1"
              @change="(idService) => changeServiceDetail(i, idService.value)"
              v-model="group.formData.name"
            />
          </v-col>
          <v-col class="px-0">
            <v-text-field
              label="QTY"
              class="mr-1"
              v-model="group.formData.qty"
              @blur="() => changeSum(i)"
            ></v-text-field>
          </v-col>
          <v-col class="px-0">
            <v-text-field
              v-model="group.formData.price"
              label="Тариф"
              disabled
              class="mr-1"
              readonly
            ></v-text-field>
          </v-col>
          <v-col class="px-0">
            <v-text-field
              v-model="group.formData.sum"
              label="Сумма"
              disabled
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-space-between">
          <v-col style="padding: 0" cols="6">
            <v-btn
              @click="removeGroup"
              class="form-btn form-btn--remove"
              color="primary"
              block
              >-</v-btn
            >
          </v-col>
          <v-col style="padding: 0" cols="6">
            <v-btn
              @click="addGroup"
              class="form-btn form-btn--add"
              color="success"
              block
              >+</v-btn
            >
          </v-col>
        </v-row>
        <v-textarea
          v-model="formComment"
          @input="formCommentError = ''"
          :error-messages="formCommentError"
          rows="2"
          clearable
          label="Комментарий"
        ></v-textarea>
      </div>
    </div>
    <v-divider></v-divider>
    <v-row class="pb-0 pt-3" justify="end">
      <v-btn class="mr-2" @click="$emit('closePopup')" small color="blue-grey">
        <v-icon small>mdi-close</v-icon>
        Закрыть
      </v-btn>
      <v-btn
        :disabled="!isFormValid || isReject"
        @click="confirmTask"
        small
        color="info"
        class="mr-2"
      >
        <v-icon small>mdi-content-save</v-icon>
        Завершить
      </v-btn>
      <v-btn @click="rejectTask" class="mr-2" small color="error">
        <v-icon small>mdi-close</v-icon>
        Отклонить
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
