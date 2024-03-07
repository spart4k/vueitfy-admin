<template>
  <div class="">
    <v-autocomplete
      clearable
      v-model="proxyValue"
      :loading="loading"
      :items="field?.items"
      :search-input.sync="searchProps"
      :error-messages="errorMessages"
      :label="field?.label"
      :multiple="field?.subtype === 'multiple'"
      class="mb-4"
      :solo="field.solo"
      :item-text="field?.selectOption?.text"
      :item-value="field?.selectOption?.value"
      no-data-text="Нет объектов"
      @change="update"
      :disabled="disabled"
      :readonly="readonly"
    >
      <template v-if="false" v-slot:prepend-item>
        <v-list-item ripple @click="selectAll">
          <v-list-item-action>
            <v-checkbox v-model="checkedAll"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>Выбрать все</v-list-item-content>
        </v-list-item>
      </template>
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
        <v-chip
          :style="{ backgroundColor: data.item.color }"
          close
          v-bind="data.attrs"
          small
          @click:close="removeSelected(data)"
        >
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
      <!--<template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name" />
            <v-list-item-subtitle v-html="data.item.id" />
          </v-list-item-content>
        </template>
      </template>-->
    </v-autocomplete>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped></style>
