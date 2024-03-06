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
                <div v-for="person in item.content" :key="person.personal_id">
                  <div v-if="!person.isEdit" class="v-object-item text--text">
                    <span class="flex-grow-1">{{ person.personal_name }}</span>
                    <div class="ml-2 d-flex align-center">
                      {{ person.coefficient
                      }}<v-btn
                        class="ml-2 v-object-item_btn"
                        icon
                        x-small
                        @click="person.isEdit = true"
                      >
                        <v-icon small color="gray">$IconEdit</v-icon></v-btn
                      >
                    </div>
                  </div>
                  <div class="d-flex" v-if="person.isEdit">
                    <div>
                      <Autocomplete :field="edit" v-model="edit.name" />
                    </div>
                    <div class="mr-3 ml-3 v-object-item_coef">
                      <v-text-field v-mask="mask" solo />
                    </div>
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
