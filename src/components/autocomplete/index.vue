<template>
  <div class="">
    <v-autocomplete
      clearable
      v-model="proxyValue"
      :loading="loading"
      :items="field.items"
      :search-input.sync="searchProps"
      :error-messages="errorMessages"
      :label="field.label"
      chips
      :multiple="field.subtype === 'multiple'"
      class="mb-4"
      :item-text="field.selectOption.text"
      :item-value="field.selectOption.value"
      no-data-text="Нет объектов"
      @change="update"
      :disabled="disabled"
      :readonly="readonly"
    >
      <template v-slot:append>
        <v-progress-circular
          v-if="loading"
          :size="20"
          :width="2"
          color="primary"
          indeterminate
        />
      </template>
      <template v-slot:selection="data">
        <v-chip close v-bind="data.attrs" small @click:close="removeSelected">
          <p>{{ data.item.name }}</p>
        </v-chip>
      </template>
      <template v-slot:append-item>
        <div class="fluid d-flex justify-center">
          <v-progress-circular
            v-if="loading"
            :size="20"
            :width="2"
            color="primary"
            indeterminate
          />
        </div>
        <div :data-field="field.name" v-intersect="endIntersect" />
      </template>
      <template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name" />
            <v-list-item-subtitle v-html="data.item.id" />
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped></style>
