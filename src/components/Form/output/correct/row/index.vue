<template>
  <div>
    <div>
      <v-row class="px-0" style="height: 50px">
        <v-col class="px-0" cols="5">
          <v-select
            v-model="formData.service_id"
            :items="servicesDetail"
            @change="(idService) => changeServiceDetail(i, idService)"
            item-text="name"
            item-value="id"
            class="mr-1"
            label="Наименование"
          ></v-select>
        </v-col>
        <v-col class="px-0">
          <v-text-field
            label="QTY"
            class="mr-1"
            v-model="formData.qty"
            @blur="() => changeSum(i)"
          ></v-text-field>
        </v-col>
        <v-col class="px-0">
          <v-text-field
            v-model="formData.price"
            label="Тариф"
            disabled
            class="mr-1"
            readonly
          ></v-text-field>
        </v-col>
        <v-col class="px-0">
          <v-text-field
            v-model="formData.sum"
            label="Сумма"
            disabled
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
