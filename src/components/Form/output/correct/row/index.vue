<template>
  <div class="row">
    <v-row class="row">
      <!-- <FormError class="mb-4" v-if="rejectedPrice">
        Отсутствует тариф: {{ rejectedPrice }}
      </FormError> -->
      <v-col class="" cols="12" sm="5">
        <!-- <v-select
          v-model="formData.service_id"
          :items="servicesDetail"
          @change="(idService) => changeServiceDetail(i, idService)"
          item-text="name"
          item-value="id"
          class="mr-1"
          filled
          label="Наименование"
        ></v-select>
        -->
        <!-- {{ fieldsData[2] }} -->
        <Autocomplete
          :field="{
            ...fieldService(),
            label: 'Наименование',
          }"
          v-model="formData.service_id"
          :error-messages="errorSerivce"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
        />
      </v-col>
      <v-col cols="12" sm="2" class="">
        <v-text-field
          label="QTY"
          class="mr-1"
          :error-messages="formErrors.qty"
          v-model="formData.qty"
          @keypress="isNumber($event)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" class="">
        <v-text-field
          v-model="formData.price"
          label="Тариф"
          disabled
          class="mr-1"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" :sm="canRemoved ? 2 : 3" class="">
        <v-text-field
          v-model="formData.sum"
          label="Сумма"
          disabled
          readonly
        ></v-text-field>
      </v-col>
      <v-col v-if="canRemoved" cols="12" sm="1" class="">
        <v-icon @click="removeService" class="mt-5">mdi-delete</v-icon>
      </v-col>
    </v-row>
    <!-- <v-messages
      class="ml-3"
      v-show="rejectedPrice"
      color="error"
      :value="rejectedPrice"
    /> -->
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
