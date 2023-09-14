<template>
  <div class="v-edit">
    <!-- <VueEditor v-model="content" /> -->
    <div class="v-edit-item">
      <div class="v-edit-item_title mt-3">От:</div>
      <div class="v-edit-item-input">
        <v-combobox
          v-model="user"
          :search-input.sync="search"
          @change="onChange"
          :items="[user]"
          chips
          item-text="name"
          item-value="id"
          return-object
          disabled
        >
          <template v-slot:selection="data">
            <v-chip
              outlined
              small
              :key="JSON.stringify(data.item.name)"
              @click:close="data.parent.selectItem(data.item.name)"
            >
              <v-avatar v-if="data.item.avatar" class="accent white--text" left>
                <v-img :src="data.item.avatar"></v-img>
              </v-avatar>
              <div class="v-edit-item-input_name">
                {{ data.item.name }}
              </div>
            </v-chip>
          </template>
        </v-combobox>
      </div>
    </div>

    <div class="v-edit-item">
      <div class="v-edit-item_title mt-3">Кому:</div>
      <div class="v-edit-item-input">
        <v-combobox
          v-model="content"
          :search-input.sync="search"
          hide-selected
          @change="onChange"
          :items="userArray"
          multiple
          chips
          item-text="name"
          item-value="id"
          clearable
          return-object
        >
          <template v-slot:item="data">
            <v-avatar
              v-if="data.item.avatar"
              class="ml-2 accent white--text"
              left
              width="30"
              height="30"
              min-width="30"
            >
              <v-img :src="data.item.avatar"></v-img>
            </v-avatar>
            <div class="ml-2 mr-2 v-edit-item-input_name">
              {{ data.item.name }}
            </div>
            <div class="v-edit-item-input_mail">
              {{ data.item.email }}
            </div>
          </template>
          <template v-slot:selection="data">
            <v-chip
              outlined
              small
              :key="JSON.stringify(data.item.name)"
              @click:close="data.parent.selectItem(data.item.name)"
            >
              <v-avatar v-if="data.item.avatar" class="accent white--text" left>
                <v-img :src="data.item.avatar"></v-img>
              </v-avatar>
              <div class="v-edit-item-input_name">
                {{ data.item.name }}
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
          <template v-slot:no-data></template>
        </v-combobox>
      </div>
    </div>

    <div class="v-edit-item">
      <div class="v-edit-item_title mt-2">Тема:</div>
      <div class="v-edit-item-input">
        <v-text-field></v-text-field>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
