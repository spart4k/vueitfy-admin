<template>
  <div class="personal">
    <div class="personal-wrap">
      <v-expansion-panels v-model="isOpen">
        <v-expansion-panel
          style="points-events: unset"
          class="personal-expension"
        >
          <v-expansion-panel-header
            :class="isOpen === 0 ? 'points-unset' : ''"
            class="personal-expension-head"
          >
            <div class="personal-head">
              <div class="personal-head-info">
                <!-- <v-checkbox
                  @click="(event) => event.stopPropagation()"
                  class=""
                ></v-checkbox> -->
                <span>{{ row.personal_name }}</span>
              </div>
              <div class="personal-head-panel"></div>
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
              <template v-else><p></p></template>
              <!-- <v-icon @click="closePopup" v-else>mdi-close</v-icon> -->
            </template>
          </v-expansion-panel-header>
          <v-icon
            v-if="!loading"
            class="personal-head-panel__close"
            @click="closePopup"
            >mdi-close</v-icon
          >
          <v-expansion-panel-content>
            <Object
              v-for="object in objects"
              :key="object.id"
              :object="object"
              :personalId="row.personal_id"
              :period="period"
              :showTotal="objects.length > 1"
            />
            <Name1
              :period="period"
              :personalId="row.personal_id"
              :object="object"
            />
            <Total :loading="loading" :info="total" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
