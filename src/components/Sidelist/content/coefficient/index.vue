<template>
  <div class="v-object d-flex flex-column h-100 w-100 pb-5">
    <SidelistHeader @closePanel="$emit('closePanel')" :data="$props.data" />
    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <SidelistSearch class="ml-7 mr-7" v-model="search" />
      <div class="overflow-auto d-block flex-grow-1 pl-7 pr-7">
        <v-expansion-panels multiple v-model="panel">
          <v-expansion-panel v-for="item in data" :key="data.id">
            <v-expansion-panel-header>
              {{ item.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-if="!item.loaded"
                class="d-flex align-center justify-center h-100 mb-3"
              >
                <v-progress-circular color="primary" :size="28" indeterminate />
              </div>
              <div v-else>
                <v-btn class="mb-3" small block color="success">+</v-btn>
                <div
                  v-for="person in item.content"
                  :key="person.personal_id"
                  class="v-object-item"
                >
                  <div
                    v-if="!person.edit.isShow"
                    class="v-object-item-person text--text"
                  >
                    <span class="flex-grow-1">{{ person.personal_name }}</span>
                    <div class="ml-2 d-flex align-center">
                      {{ person.coefficient
                      }}<v-btn
                        class="ml-2 v-object-item-person_btn"
                        icon
                        x-small
                        @click="editPerson(person)"
                      >
                        <v-icon small color="gray">$IconEdit</v-icon></v-btn
                      >
                      <v-btn class="v-object-item-person_btn" icon x-small>
                        <v-icon small color="error">$IconClose</v-icon></v-btn
                      >
                    </div>
                  </div>
                  <div
                    class="d-flex align-center v-object-item-edit mb-1 mt-1"
                    v-else
                  >
                    <div class="flex-grow-1 v-object-item-edit_select">
                      <Autocomplete
                        :field="edit"
                        v-model="person.edit.name_id"
                      />
                    </div>
                    <div class="mr-3 ml-3 v-object-item-edit_coef">
                      <v-text-field
                        v-model="person.edit.coefficient"
                        v-mask="mask(person.edit.coefficient)"
                        solo
                      />
                    </div>
                    <v-btn icon x-small>
                      <v-icon small color="success">$IconGalka</v-icon></v-btn
                    >
                    <v-btn icon x-small @click="person.edit.isShow = false">
                      <v-icon small color="gray"
                        >$IconArrowCircleRight</v-icon
                      ></v-btn
                    >
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
