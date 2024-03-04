<template>
  <div class="row">
    <v-row class="row" style="height: 50px">
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
        ></v-select> -->
        <Autocomplete
          :field="{
            ...fieldsData[0],
            label: 'Наименование',
          }"
          v-model="formData.service_id"
          :error-messages="formErrors[field?.name]"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
        />
      </v-col>
      <v-col cols="12" sm="2" class="">
        <v-text-field
          label="QTY"
          class="mr-1"
          v-model="formData.qty"
          @blur="() => changeSum(i)"
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
      <v-col cols="12" sm="3" class="">
        <v-text-field
          v-model="formData.sum"
          label="Сумма"
          disabled
          readonly
        ></v-text-field>
      </v-col>
      <!-- {{ fieldsData[0].items }} -->
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
