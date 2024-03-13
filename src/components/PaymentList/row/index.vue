<template>
  <div class="personal">
    <div class="personal-wrap">
      <v-expansion-panels v-model="isOpen">
        <v-expansion-panel class="personal-expension">
          <v-expansion-panel-header class="personal-expension-head">
            <div class="personal-head">
              <div class="personal-head-info">
                <v-checkbox
                  @click="(event) => event.stopPropagation()"
                  class=""
                ></v-checkbox>
                <span>{{ row.personal_name }}</span>
              </div>
              <div class="personal-head-panel"></div>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template v-if="!loading">
              <Object
                v-for="object in objects"
                :key="object.id"
                :object="object"
                :personalId="row.personal_id"
                :period="period"
                :showTotal="objects.length > 1"
              />
            </template>
            <template v-else>
              <div v-for="loading in 1" :key="loading" class="form-row-loading">
                <div class="form-row-loading-wrap gradient"></div>
              </div>
            </template>

            <Total :loading="loading" :info="total" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
