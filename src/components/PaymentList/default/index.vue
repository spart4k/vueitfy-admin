<template>
  <div class="v-table">
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
      <div
        :class="true ? 'v-table-panel--fixed' : ''"
        class="v-table-panel align-center"
      >
        <div style="" class="v-table-panel-items">
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
            <!-- buttons -->
            <v-btn @click="exportPayment" small color="primary">Экспорт</v-btn>
          </div>
        </div>
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
            <!-- buttons -->
          </div>
          <div v-if="true" class="v-table-panel-items__search">
            <v-text-field
              label="Поиск"
              hide-details="auto"
              clearable
              v-model="searchInput"
            ></v-text-field>
            <!-- <v-btn small class="ml-2" elevation="2"> Фильтры </v-btn> -->
          </div>
        </div>
      </div>

      <div class="v-table-wrap">
        <template v-if="loading">
          <div
            class="v-table-loading text-center d-flex align-center justify-center flex-grow-1"
          >
            <v-progress-circular color="primary" :size="80" indeterminate />
          </div>
        </template>
        <template v-else>
          <div
            v-if="!managers.length"
            class="v-table-loading text-center d-flex align-center justify-center flex-grow-1"
          >
            <div class="">Отсутствует</div>
          </div>
          <template v-else>
            <!-- <Row
              v-for="row in rows"
              :row="row"
              :period="currentDate.date"
              :key="row.personal_id"
            /> -->
            <Manager
              v-for="manager in managers"
              :manager="manager"
              :rows="manager.personals"
              :period="currentDate.date"
              @openPersonal="openPersonal"
              :searchValue="searchInput"
              ref="managerRef"
            />
          </template>
        </template>
      </div>
    </div>
    <Popup
      closeButto
      @close="closePopupForm"
      :options="{
        width: '650px',
        portal: `table-detail${
          options?.detail?.popupIndex ? options?.detail?.popupIndex : ''
        }`,
      }"
      v-if="popupForm.isShow"
    >
      <router-view
        :row="activePerson"
        :detail="detail"
        @closePopup="closePopupForm"
        :period="currentDate.date"
      />
    </Popup>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./setup.js"></script>
