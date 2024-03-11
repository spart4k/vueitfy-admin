<template>
  <div class="">
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
      <div :class="true ? 'v-table-panel--fixed' : ''" class="v-table-panel">
        <div class="v-table-panel-date">
          <v-btn icon class="mr-4" @click="changeMonth(-1)">
            <v-icon small> $IconArrowLeft </v-icon>
          </v-btn>
          <div class="v-table-panel-date_month">
            {{ currentDate.monthArray[currentDate.month] }}
            {{ currentDate.year }}
          </div>
          <v-btn icon class="ml-4" @click="changeMonth(1)">
            <v-icon small> $IconArrowRight </v-icon>
          </v-btn>
        </div>
        <div class="v-table-panel-items">
          <div class="v-table-panel-items__actions flex-wrap">
            <!-- <v-btn
              v-for="(button, indexButton) in availablePanelBtn"
              :key="indexButton"
              @click="panelHandler(button)"
              :disabled="button.isDisabled"
              small
            >
              <v-icon small class="mr-2">
                {{ button.url }}
              </v-icon>
              <p v-if="true">{{ button.label }}</p>
            </v-btn> -->
            buttons
          </div>
          <div class="v-table-panel-items__search">
            <v-text-field
              label="Поиск"
              hide-details="auto"
              clearable
            ></v-text-field>
            <!-- <v-btn small class="ml-2" elevation="2"> Фильтры </v-btn> -->
          </div>
        </div>
      </div>

      <div class="v-table-wrap">
        <Row v-for="row in 10" :key="row" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./setup.js"></script>
