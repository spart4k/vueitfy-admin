<template>
  <div :class="`select_${field.name}`" class="">
    <v-autocomplete
      clearable
      v-model="proxyValue"
      :loading="loading"
      :items="field.items"
      :search-input.sync="searchProps"
      :error-messages="errorMessages"
      :label="field.label"
      :multiple="field.subtype === 'multiple'"
      class="mb-4"
      :item-text="field.selectOption.text"
      :item-value="field.selectOption.value"
      no-data-text="Нет объектов"
      @change="update"
      :disabled="disabled"
      :readonly="readonly"
      :name="field.name"
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
      <template v-slot:item="data">
        <template>
          <v-list-item-content>
            <v-row class="d-flex">
              <div v-if="data.item?.color" class="mr-2 d-flex align-center">
                <div
                  :style="{ backgroundColor: data.item.color }"
                  class="colorCube"
                ></div>
              </div>
              <span class="textDefault--text">
                <v-list-item-title v-html="data.item.name" />
              </span>
            </v-row>
            <!-- <v-list-item-subtitle v-html="data.item.id" /> -->
          </v-list-item-content>
        </template>
      </template>
      <template v-if="field?.appendAction?.length" v-slot:append-outer>
        <v-tooltip v-for="action in field.appendAction" :key="action.label" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="parentComp.appendFieldHandler({ action, field })"
              v-if="parentComp.appendActionShow(action)"
              text
              v-bind="attrs"
              v-on="on"
              class=""
              small
            >
              <v-tooltip activator="parent" location="top">Tooltip</v-tooltip>
              <v-icon> {{ action.icon }} </v-icon></v-btn
            >
          </template>
          <span>{{ action.label }}</span>
        </v-tooltip>
      </template>
    </v-autocomplete>
  </div>
</template>
<script src="./setup"></script>
<style src="./style.scss" lang="scss" scoped></style>
