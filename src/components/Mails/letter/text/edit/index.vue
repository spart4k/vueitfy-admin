<template>
  <div class="v-edit">
    <VueEditor v-model="content" />
    <v-file-input
      v-model="files"
      outlined
      label="Загрузить файлы"
      chips
      multiple
    >
      <template v-slot:selection="data">
        <v-chip @click.stop outlined>
          <div class="v-edit-item-input_name">
            {{ data.text }}
          </div>
          <v-icon
            class="ml-2"
            color="disabled"
            small
            @click="deleteItem(data.index)"
          >
            $IconClose
          </v-icon>
        </v-chip>
      </template>
    </v-file-input>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
