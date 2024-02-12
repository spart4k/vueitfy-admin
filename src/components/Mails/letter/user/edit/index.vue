<template>
  <div class="v-edit">
    <div class="v-edit-item">
      <div class="v-edit-item_title mt-3">От:</div>
      <div class="v-edit-item-input">
        <v-select
          v-model="$props.data.box_id"
          :items="$props.filterData.boxData"
          item-text="name"
          item-value="id"
          :disabled="!!$route?.query?.mail"
        >
        </v-select>
      </div>
    </div>
    <div class="v-edit-item">
      <div class="v-edit-item_title mt-3">Кому:</div>
      <div class="v-edit-item-input">
        <v-combobox
          v-model="$props.data.users"
          :items="user.items"
          :menu-props="{ maxHeight: '400' }"
          no-data-text="Нет пользователей"
          hide-selected
          :search-input.sync="user.search"
          multiple
          :filter="accountFilter"
          clearable
          chips
          deletable-chips
          item-text="fio"
          item-value="id"
          return-object
        >
          <template slot="item" slot-scope="{ item }">
            <!-- <v-avatar
              v-if="item.avatar"
              class="ml-2 accent white--text"
              left
              width="30"
              height="30"
              min-width="30"
            >
              <v-img :src="item.avatar"></v-img>
            </v-avatar> -->
            <div class="ml-2 mr-2 v-edit-item-input_name">
              {{ item.fio }}
            </div>
            <div class="v-edit-item-input_mail">
              {{ item.email }}
            </div>
          </template>
          <template v-slot:selection="data">
            <v-chip outlined small :key="JSON.stringify(data.item.fio)">
              <v-avatar v-if="data.item.avatar" class="accent white--text" left>
                <v-img :src="data.item.avatar"></v-img>
              </v-avatar>
              <div class="v-edit-item-input_name">
                {{ data.item.fio }}
              </div>
              <v-icon
                class="ml-2 v-edit-item-input_btn"
                color="disabled"
                small
                @click="$emit('deleteUser', data.index)"
              >
                $IconClose
              </v-icon>
            </v-chip>
          </template>
          <template v-slot:append-item>
            <div v-intersect="endIntersect" />
          </template>
          <template v-slot:no-data></template>
        </v-combobox>
      </div>
    </div>
    <div class="v-edit-item">
      <div class="v-edit-item_title mt-2">Тема:</div>
      <div class="v-edit-item-input">
        <v-text-field v-model="$props.data.subject"></v-text-field>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
