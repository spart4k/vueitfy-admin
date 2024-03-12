<template>
  <div class="v-autocomplete">
    <v-autocomplete
      clearable
      v-model="proxyValue"
      :loading="loading"
      :items="field.items"
      :search-input.sync="search"
      :error-messages="errorMessages"
      :label="field.label"
      :multiple="field.subtype === 'multiple'"
      :solo="field.solo"
      :outlined="field.outlined"
      :item-text="field.selectOption.text"
      :item-value="field.selectOption.value"
      :rules="field.required && [() => !!proxyValue || '']"
      no-data-text="Нет объектов"
      @change="update"
      :readonly="$props.readonly"
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
<style src="./style.scss" lang="scss" scoped></style>
