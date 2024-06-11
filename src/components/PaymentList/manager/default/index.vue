<template>
  <div class="manager">
    <div class="manager-wrap">
      <v-expansion-panels v-model="isOpen">
        <v-expansion-panel class="manager-expension">
          <v-expansion-panel-header class="manager-expension-head">
            <div class="manager-head">
              <div class="manager-head-info">
                <v-checkbox
                  @click.stop="touchManager(manager)"
                  class=""
                  v-model="manager.touching"
                ></v-checkbox>
                <span>{{ manager.account_name }}</span>
              </div>
              <div class="manager-head-panel"></div>
            </div>
            <template v-slot:actions>
              <!-- <svg
                v-if="!loading"
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 0L0.602886 4.5H8.39711L4.5 0Z" fill="#90A0B7" />
              </svg> -->

              <v-progress-circular
                v-if="loading"
                color="primary"
                :size="28"
                indeterminate
              />
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- <personal
              v-for="row in rows"
              :row="row"
              :period="period"
              :key="row.personal_id"
            /> -->
            <!-- <p v-for="item in 50" :key="item">Линейщик 1</p> -->
            <div
              @dblclick="openPersonal(row)"
              v-for="row in objects"
              :key="row.personal_id"
              class="personal"
            >
              <v-checkbox
                v-model="row.touching"
                @click.stop
                class=""
              ></v-checkbox>
              <span> {{ row.personal_name }}</span>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
