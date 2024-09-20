<template>
  <v-card class="pa-6">
    <div class="d-flex align-center justify-space-between">
      <span class="font-weight-700 text--text font-size-24"
        >Дополнительное соглашение</span
      ><span class="font-weight-500 primary--text"
        >v {{ version.version }}.{{ version.items.length + 1 }}</span
      >
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="mb-3">
      <div class="text--text mb-2">Название соглашения</div>
      <v-text-field
        class="textField"
        v-model="formData.name"
        clearable
        dense
        hide-details
        outlined
      />
    </div>
    <div class="mb-3">
      <div class="text--text mb-2">Срок действия</div>
      <div class="d-flex">
        <Datepicker
          :options="{ dense: true, 'hide-options': true, outlined: true }"
          class="datePicker"
          v-model="formData.date_from"
        ></Datepicker
        ><v-icon size="16" class="mx-4 cursor-default">mdi-arrow-right</v-icon
        ><Datepicker
          :options="{ dense: true, 'hide-options': true, outlined: true }"
          class="datePicker"
          v-model="formData.date_to"
        ></Datepicker>
      </div>
    </div>
    <div class="mb-3">
      <v-switch
        dense
        inset
        class="dialogSwitch"
        hide-details
        color="primary"
        v-model="formData.with_prolongation"
        label="Пролонгация"
      ></v-switch>
    </div>
    <div class="mb-3" v-if="formData.with_prolongation">
      <v-switch
        dense
        inset
        class="dialogSwitch"
        hide-details
        color="primary"
        v-model="formData.prolongation_price"
        label="Продлить тарифы"
      ></v-switch>
    </div>
    <div class="mb-3">
      <v-switch
        dense
        :disabled="formData.with_prolongation"
        inset
        class="dialogSwitch"
        hide-details
        color="primary"
        v-model="formData.prolongation_tarif"
        label="Загрузить тарифы"
      ></v-switch>
    </div>
    <div>
      <DropZone
        :options="fields.file.options"
        v-model="formData.file"
        :formData="formData"
        :field="fields.file"
      />
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="d-flex justify-end">
      <v-btn elevation="0" @click="$emit('close')" class="mr-3">Закрыть</v-btn>
      <v-btn
        elevation="0"
        @click="
          clickHandler({
            action: {
              module: 'form/create',
              url: 'add/contract/additional',
              action: 'saveFormStore',
              notClose: true,
            },
          })
        "
        :disabled="
          !(
            formData.name &&
            formData.date_from &&
            formData.date_to &&
            formData.file.length
          )
        "
        color="primary"
        >Сохранить</v-btn
      >
    </div>
  </v-card>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
