<template>
  <v-row class="d-flex align-center">
    <v-col class="px-0" cols="12" sm="6">
      <!-- {{ group.formData }} -->
      <Autocomplete
        :field="autocompleteConfig"
        class="mr-1"
        @change="(idService) => changeServiceDetail(i, idService.value)"
        v-model="formData.name"
        :error-messages="formErrors.name"
      />
    </v-col>
    <v-col sm="2">
      <v-text-field
        label="QTY"
        class="mr-1"
        v-model="formData.qty"
        @input="() => changeSum(i)"
        :error-messages="formErrors.qty"
      ></v-text-field>
    </v-col>
    <v-col sm="2">
      <v-text-field
        v-model="formData.price"
        label="Тариф"
        disabled
        class="mr-1"
        readonly
        :error-messages="formErrors.price"
      ></v-text-field>
    </v-col>
    <v-col sm="2">
      <v-text-field
        v-model="formData.sum"
        label="Сумма"
        disabled
        readonly
        :error-messages="formErrors.sum"
      ></v-text-field>
    </v-col>
    <!-- <v-col class="px-0 d-flex justify-center">
      <v-icon @click="removeRow" color="red" small>$IconClose</v-icon>
    </v-col> -->
  </v-row>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
