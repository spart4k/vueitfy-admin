<template>
  <div class="v-edit">
    <!-- <VueEditor v-model="content" /> -->
    <div class="v-edit-item">
      <div class="v-edit-item_title">От:</div>
      <div class="v-edit-item_input">
        <v-autocomplete
          :items="user"
          v-model="user"
          chips
          closable-chips
          color="blue-grey-lighten-2"
          item-title="name"
          item-value="name"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :text="item.raw.name"
            ></v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item?.raw?.avatar"
              :title="item?.raw?.name"
              :subtitle="item?.raw?.group"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
